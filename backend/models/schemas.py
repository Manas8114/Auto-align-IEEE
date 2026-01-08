from pydantic import BaseModel, Field
from typing import List, Optional

class Section(BaseModel):
    """A section of the IEEE paper."""
    heading: str = Field(..., description="Section heading (e.g., Introduction, Methodology)")
    content: str = Field(..., description="Section content in academic tone")

class Figure(BaseModel):
    """A figure reference in the paper."""
    index: int = Field(..., description="Index of the uploaded image (0-based)")
    caption: str = Field(..., description="IEEE-formatted figure caption")
    placement: str = Field(..., description="Section where the figure should appear")

class StructuredPaper(BaseModel):
    """Complete structured IEEE paper."""
    title: str = Field(..., description="Paper title")
    authors: str = Field(default="[Author Name]", description="Author names")
    abstract: str = Field(..., description="Paper abstract (150-250 words)")
    keywords: List[str] = Field(..., description="List of 4-6 keywords")
    sections: List[Section] = Field(..., description="Paper sections")
    figures: List[Figure] = Field(default=[], description="Figure references")
    references: List[str] = Field(default=[], description="Generated references")

class GeneratePaperRequest(BaseModel):
    """Request model for paper generation."""
    raw_content: str = Field(..., description="Raw unstructured content", max_length=100000)
    image_count: int = Field(default=0, description="Number of uploaded images")

class GeneratePaperResponse(BaseModel):
    """Response model for paper generation."""
    success: bool
    paper: Optional[StructuredPaper] = None
    error: Optional[str] = None

class ExportDocxRequest(BaseModel):
    """Request model for .docx export."""
    paper: StructuredPaper
    
class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
