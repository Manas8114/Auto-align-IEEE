"""
AI Processor Service for IEEE Paper Generation.

This module uses Google Gemini to intelligently structure raw content
into IEEE-formatted sections with academic tone enhancement.
"""

import json
import re
from typing import List, Optional
import google.generativeai as genai

from config import settings
from models.schemas import StructuredPaper, Section, Figure

# System prompt for IEEE paper structuring
SYSTEM_PROMPT = """You are an expert academic writing assistant specializing in IEEE-formatted research papers.

Your task is to transform raw, unstructured content into a properly structured IEEE research paper.

CRITICAL RULES:
1. PRESERVE all factual information - do NOT hallucinate or add information not present in the source
2. ENHANCE language to formal academic tone while keeping meaning intact
3. STRUCTURE content logically into IEEE sections
4. GENERATE appropriate figure captions if images are mentioned
5. INFER a suitable title from the content's main topic

OUTPUT FORMAT:
Return ONLY valid JSON matching this exact structure:
{
    "title": "A descriptive academic title for the paper",
    "abstract": "A concise 150-250 word summary of the entire paper content",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    "sections": [
        {"heading": "Introduction", "content": "Introduction text..."},
        {"heading": "Literature Review", "content": "Related work text..."},
        {"heading": "Methodology", "content": "Methods and approach..."},
        {"heading": "Results and Discussion", "content": "Findings and analysis..."},
        {"heading": "Conclusion", "content": "Summary and future work..."}
    ],
    "figures": [
        {"index": 0, "caption": "Figure caption describing what the image shows", "placement": "Methodology"}
    ],
    "references": [
        "[1] Author, \"Title,\" Journal, vol. X, pp. Y-Z, Year."
    ]
}

SECTION GUIDELINES:
- Introduction: Background, problem statement, research objectives
- Literature Review: If prior work is mentioned, otherwise skip
- Methodology: Approach, methods, algorithms, system design
- Results and Discussion: Findings, analysis, comparisons
- Conclusion: Summary, contributions, future work

FIGURE HANDLING:
- If the user indicates they have N images, suggest placements for figures
- Generate academic-style captions (e.g., "Fig. 1. Architecture of the proposed system")
- Place figures in contextually appropriate sections

LANGUAGE ENHANCEMENT:
- Use passive voice where appropriate
- Remove first-person pronouns
- Use formal academic vocabulary
- Ensure logical flow between paragraphs"""


class AIProcessor:
    """Processes raw content using Gemini AI to create structured IEEE papers."""
    
    def __init__(self):
        """Initialize the AI processor with Gemini API."""
        if not settings.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(
            model_name=settings.GEMINI_MODEL,
            generation_config={
                "temperature": 0.3,  # Lower temperature for more consistent output
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 8192,
            }
        )
    
    def _clean_json_response(self, response_text: str) -> str:
        """Extract JSON from response, handling markdown code blocks."""
        # Remove markdown code blocks if present
        json_match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', response_text)
        if json_match:
            return json_match.group(1).strip()
        
        # Try to find JSON object directly
        json_match = re.search(r'\{[\s\S]*\}', response_text)
        if json_match:
            return json_match.group(0)
        
        return response_text
    
    def _validate_and_fix_sections(self, sections: List[dict]) -> List[Section]:
        """Validate and fix section structure."""
        required_sections = ["Introduction", "Conclusion"]
        section_headings = [s.get("heading", "") for s in sections]
        
        # Ensure at least Introduction and Conclusion exist
        validated = []
        for section_data in sections:
            heading = section_data.get("heading", "Untitled Section")
            content = section_data.get("content", "")
            if content:  # Only include sections with content
                validated.append(Section(heading=heading, content=content))
        
        # Add missing required sections if needed
        has_intro = any(s.heading.lower() == "introduction" for s in validated)
        has_conclusion = any(s.heading.lower() == "conclusion" for s in validated)
        
        if not has_intro and validated:
            validated.insert(0, Section(
                heading="Introduction",
                content="This paper presents the research and findings discussed in the following sections."
            ))
        
        if not has_conclusion and validated:
            validated.append(Section(
                heading="Conclusion",
                content="This paper has presented the key findings and contributions of the research."
            ))
        
        return validated
    
    async def process_content(
        self, 
        raw_content: str, 
        image_count: int = 0
    ) -> StructuredPaper:
        """
        Process raw content and structure it into an IEEE paper.
        
        Args:
            raw_content: Unstructured text content
            image_count: Number of images uploaded by user
            
        Returns:
            StructuredPaper object with all sections
        """
        # Build the user prompt
        image_note = ""
        if image_count > 0:
            image_note = f"\n\nNOTE: The user has uploaded {image_count} image(s). Please suggest appropriate placements and generate academic figure captions for them."
        
        user_prompt = f"""Transform the following raw content into a structured IEEE research paper.
        
RAW CONTENT:
{raw_content}
{image_note}

Return ONLY valid JSON as specified in your instructions."""

        try:
            # Generate response from Gemini
            response = self.model.generate_content([
                {"role": "user", "parts": [SYSTEM_PROMPT]},
                {"role": "model", "parts": ["I understand. I will transform raw content into properly structured IEEE papers, returning only valid JSON. I will preserve all factual information, enhance language to academic tone, and never hallucinate content."]},
                {"role": "user", "parts": [user_prompt]}
            ])
            
            # Parse the response
            response_text = response.text
            clean_json = self._clean_json_response(response_text)
            paper_data = json.loads(clean_json)
            
            # Validate and structure the paper
            sections = self._validate_and_fix_sections(paper_data.get("sections", []))
            
            figures = []
            for fig_data in paper_data.get("figures", []):
                if fig_data.get("index", 0) < image_count:
                    figures.append(Figure(
                        index=fig_data.get("index", 0),
                        caption=fig_data.get("caption", f"Figure {fig_data.get('index', 0) + 1}"),
                        placement=fig_data.get("placement", sections[0].heading if sections else "Introduction")
                    ))
            
            # Build the structured paper
            paper = StructuredPaper(
                title=paper_data.get("title", "Untitled Research Paper"),
                authors=paper_data.get("authors", "[Author Name]"),
                abstract=paper_data.get("abstract", "Abstract not generated."),
                keywords=paper_data.get("keywords", ["research", "study", "analysis"]),
                sections=sections,
                figures=figures,
                references=paper_data.get("references", [])
            )
            
            return paper
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse AI response as JSON: {str(e)}")
        except Exception as e:
            raise RuntimeError(f"AI processing failed: {str(e)}")


# Singleton instance
_processor: Optional[AIProcessor] = None

def get_ai_processor() -> AIProcessor:
    """Get or create the AI processor singleton."""
    global _processor
    if _processor is None:
        _processor = AIProcessor()
    return _processor
