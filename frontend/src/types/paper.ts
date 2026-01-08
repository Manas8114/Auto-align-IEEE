/**
 * Type definitions for IEEE Paper Generator
 */

export interface Section {
    heading: string;
    content: string;
}

export interface Figure {
    index: number;
    caption: string;
    placement: string;
}

export interface StructuredPaper {
    title: string;
    authors: string;
    abstract: string;
    keywords: string[];
    sections: Section[];
    figures: Figure[];
    references: string[];
}

export interface GeneratePaperResponse {
    success: boolean;
    paper?: StructuredPaper;
    error?: string;
}

export interface UploadedImage {
    file: File;
    preview: string;
    name: string;
}
