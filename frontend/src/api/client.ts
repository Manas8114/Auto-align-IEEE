/**
 * API Client for IEEE Paper Generator Backend
 */

import axios from 'axios';
import type { StructuredPaper, GeneratePaperResponse } from '../types/paper';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
    },
});

/**
 * Generate a structured IEEE paper from raw content
 */
export async function generatePaper(
    rawContent: string,
    images: File[]
): Promise<GeneratePaperResponse> {
    const formData = new FormData();
    formData.append('raw_content', rawContent);

    images.forEach((image) => {
        formData.append('images', image);
    });

    const response = await apiClient.post<GeneratePaperResponse>(
        '/api/generate-paper',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return response.data;
}

/**
 * Export the paper as a DOCX file
 */
export async function exportDocx(paper: StructuredPaper): Promise<Blob> {
    const response = await apiClient.post(
        '/api/export-docx',
        paper,
        {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
}

/**
 * Clear the current session
 */
export async function clearSession(): Promise<void> {
    await apiClient.post('/api/clear-session');
}

/**
 * Health check
 */
export async function healthCheck(): Promise<boolean> {
    try {
        const response = await apiClient.get('/api/health');
        return response.status === 200;
    } catch {
        return false;
    }
}
