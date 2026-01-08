import os
from typing import Optional

class Settings:
    """Application configuration settings."""
    
    # API Settings
    API_TITLE: str = "IEEE Paper Generator API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "Convert raw content into IEEE-formatted research papers"
    
    # CORS Settings
    CORS_ORIGINS: list = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]
    
    # AI Settings
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")
    GEMINI_MODEL: str = "gemini-1.5-flash"
    
    # Document Settings
    MAX_CONTENT_LENGTH: int = 100000  # Max characters for raw content
    MAX_IMAGES: int = 10
    MAX_IMAGE_SIZE_MB: int = 5

settings = Settings()
