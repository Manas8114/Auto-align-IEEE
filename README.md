# IEEE Paper Generator

Convert raw, unstructured content into fully IEEE-compliant research papers formatted for Microsoft Word (.docx).

## Features

- **AI-Powered Structuring**: Automatically divides content into IEEE sections (Abstract, Introduction, Methodology, Results, Conclusion)
- **Academic Tone Enhancement**: Enhances language to formal academic style while preserving factual integrity
- **Image Support**: Upload figures and diagrams with auto-generated captions
- **IEEE Formatting**: Two-column layout, Times New Roman fonts, proper spacing
- **Word Export**: Download editable .docx files ready for submission

## Prerequisites

- **Python 3.10+** (for backend)
- **Node.js 18+** (for frontend)
- **Gemini API Key** (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set your Gemini API key
set GEMINI_API_KEY=your_api_key_here

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at <http://localhost:8000>
API docs: <http://localhost:8000/docs>

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at <http://localhost:5173>

## Project Structure

```
IEEE automization/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── config.py               # Configuration settings
│   ├── requirements.txt        # Python dependencies
│   ├── models/
│   │   └── schemas.py          # Pydantic models
│   ├── routes/
│   │   └── paper.py            # API endpoints
│   └── services/
│       ├── ai_processor.py     # Gemini AI integration
│       └── docx_generator.py   # IEEE document generation
│
└── frontend/
    ├── src/
    │   ├── App.tsx             # Main router
    │   ├── index.css           # Tailwind styles
    │   ├── api/
    │   │   └── client.ts       # API client
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── TextEditor.tsx
    │   │   ├── ImageUpload.tsx
    │   │   ├── PaperPreview.tsx
    │   │   └── SectionNav.tsx
    │   ├── pages/
    │   │   ├── LandingPage.tsx
    │   │   ├── EditorPage.tsx
    │   │   └── OutputPage.tsx
    │   └── types/
    │       └── paper.ts
    └── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate-paper` | Generate structured paper from raw content |
| POST | `/api/export-docx` | Export paper as IEEE-formatted .docx |
| POST | `/api/clear-session` | Clear session data |
| GET | `/api/health` | Health check |

## IEEE Formatting Standards

The generated documents follow IEEE conference paper guidelines:

- **Page Size**: A4
- **Layout**: Two-column (except title and abstract)
- **Font**: Times New Roman
  - Title: 24pt bold
  - Body: 10pt
  - Headings: Small caps
- **Spacing**: Single-spaced
- **Figures**: IEEE numbered captions (Fig. 1, Fig. 2, etc.)

## Privacy

- No content is stored after download
- All processing happens in-memory
- Images are cleared after session ends

## License

MIT
