"""
API Routes for Paper Generation.
"""

import io
from typing import List, Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse

from models.schemas import (
    GeneratePaperRequest,
    GeneratePaperResponse,
    StructuredPaper,
    MessageResponse
)
from services.ai_processor import get_ai_processor
from services.docx_generator import get_docx_generator
from config import settings

router = APIRouter(prefix="/api", tags=["Paper Generation"])

# Temporary storage for images during session (in-memory only, no persistence)
_session_images: List[bytes] = []
_session_paper: Optional[StructuredPaper] = None


@router.post("/generate-paper", response_model=GeneratePaperResponse)
async def generate_paper(
    raw_content: str = Form(...),
    images: List[UploadFile] = File(default=[])
):
    """
    Generate a structured IEEE paper from raw content.
    
    - Accepts raw text and optional images
    - Uses AI to structure content into IEEE sections
    - Returns structured paper data for preview
    """
    global _session_images, _session_paper
    
    # Validate content length
    if len(raw_content) > settings.MAX_CONTENT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Content exceeds maximum length of {settings.MAX_CONTENT_LENGTH} characters"
        )
    
    # Validate number of images
    if len(images) > settings.MAX_IMAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Maximum {settings.MAX_IMAGES} images allowed"
        )
    
    try:
        # Read and store images
        _session_images = []
        for img in images:
            img_data = await img.read()
            # Validate image size
            if len(img_data) > settings.MAX_IMAGE_SIZE_MB * 1024 * 1024:
                raise HTTPException(
                    status_code=400,
                    detail=f"Image {img.filename} exceeds maximum size of {settings.MAX_IMAGE_SIZE_MB}MB"
                )
            _session_images.append(img_data)
        
        # Process content with AI
        processor = get_ai_processor()
        paper = await processor.process_content(raw_content, len(_session_images))
        
        # Store paper for export
        _session_paper = paper
        
        return GeneratePaperResponse(success=True, paper=paper)
        
    except ValueError as e:
        return GeneratePaperResponse(success=False, error=str(e))
    except RuntimeError as e:
        return GeneratePaperResponse(success=False, error=str(e))
    except Exception as e:
        return GeneratePaperResponse(success=False, error=f"Unexpected error: {str(e)}")


@router.post("/export-docx")
async def export_docx(paper: StructuredPaper):
    """
    Export the structured paper as an IEEE-formatted DOCX file.
    
    - Takes the structured paper data
    - Generates a properly formatted Word document
    - Returns the file for download
    """
    global _session_images
    
    try:
        generator = get_docx_generator()
        docx_bytes = generator.generate(paper, _session_images)
        
        # Create a safe filename from the title
        safe_title = "".join(c for c in paper.title[:50] if c.isalnum() or c in " -_").strip()
        if not safe_title:
            safe_title = "ieee_paper"
        filename = f"{safe_title}.docx"
        
        # Return as downloadable file
        return StreamingResponse(
            io.BytesIO(docx_bytes),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate document: {str(e)}")


@router.post("/clear-session", response_model=MessageResponse)
async def clear_session():
    """Clear the session data (images and paper)."""
    global _session_images, _session_paper
    _session_images = []
    _session_paper = None
    return MessageResponse(message="Session cleared successfully")


@router.get("/health", response_model=MessageResponse)
async def health_check():
    """Health check endpoint."""
    return MessageResponse(message="IEEE Paper Generator API is running")
