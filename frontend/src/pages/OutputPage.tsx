/**
 * Output Page - Paper preview and download
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaperPreview from '../components/PaperPreview';
import SectionNav from '../components/SectionNav';
import { exportDocx } from '../api/client';
import type { StructuredPaper } from '../types/paper';

export default function OutputPage() {
    const navigate = useNavigate();
    const [paper, setPaper] = useState<StructuredPaper | null>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load paper from session storage
        const storedPaper = sessionStorage.getItem('generatedPaper');
        if (storedPaper) {
            try {
                setPaper(JSON.parse(storedPaper));
            } catch {
                navigate('/editor');
            }
        } else {
            navigate('/editor');
        }
    }, [navigate]);

    const handleDownload = async () => {
        if (!paper) return;

        setIsDownloading(true);
        setError(null);

        try {
            const blob = await exportDocx(paper);

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${paper.title.replace(/[^a-z0-9]/gi, '_').slice(0, 50)}.docx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download error:', err);
            setError('Failed to download document. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleCreateNew = () => {
        sessionStorage.removeItem('generatedPaper');
        navigate('/editor');
    };

    if (!paper) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your IEEE Paper</h1>
                        <p className="text-gray-500 mt-1">Review and download your formatted paper</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleCreateNew}
                            className="btn-secondary"
                        >
                            Create New Paper
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="btn-primary flex items-center"
                        >
                            {isDownloading ? (
                                <>
                                    <span className="spinner w-5 h-5 mr-2"></span>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download IEEE Paper (.docx)
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Section Navigation */}
                    <div className="lg:col-span-1">
                        <SectionNav
                            sections={paper.sections}
                            activeSection={activeSection}
                            onSectionClick={setActiveSection}
                        />

                        {/* Paper Stats */}
                        <div className="mt-6 bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                Paper Stats
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Sections:</span>
                                    <span className="font-medium">{paper.sections.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Keywords:</span>
                                    <span className="font-medium">{paper.keywords.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Figures:</span>
                                    <span className="font-medium">{paper.figures.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>References:</span>
                                    <span className="font-medium">{paper.references.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paper Preview */}
                    <div className="lg:col-span-3">
                        <PaperPreview paper={paper} />
                    </div>
                </div>
            </div>
        </div>
    );
}
