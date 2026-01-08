/**
 * Editor Page - Main content creation interface
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import ImageUpload from '../components/ImageUpload';
import { generatePaper } from '../api/client';
import type { UploadedImage } from '../types/paper';

export default function EditorPage() {
    const navigate = useNavigate();

    const [rawContent, setRawContent] = useState('');
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!rawContent.trim()) {
            setError('Please enter some content to generate a paper.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const imageFiles = images.map(img => img.file);
            const response = await generatePaper(rawContent, imageFiles);

            if (response.success && response.paper) {
                // Store paper in session storage for output page
                sessionStorage.setItem('generatedPaper', JSON.stringify(response.paper));
                navigate('/output');
            } else {
                setError(response.error || 'Failed to generate paper. Please try again.');
            }
        } catch (err) {
            console.error('Generation error:', err);
            setError('Failed to connect to the server. Please ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col">
            {/* Main Editor Area */}
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-3 gap-6 h-full">
                    {/* Left Panel - Text Editor (2/3 width) */}
                    <div className="lg:col-span-2 card p-6">
                        <TextEditor
                            value={rawContent}
                            onChange={setRawContent}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Right Panel - Image Upload (1/3 width) */}
                    <div className="card p-6">
                        <ImageUpload
                            images={images}
                            onImagesChange={setImages}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Status */}
                        <div className="text-sm text-gray-500">
                            {rawContent.length > 0 && (
                                <span>
                                    {rawContent.trim().split(/\s+/).length} words
                                    {images.length > 0 && ` · ${images.length} image${images.length > 1 ? 's' : ''}`}
                                </span>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center text-red-600 text-sm">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Generate Button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !rawContent.trim()}
                            className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-200
                ${isLoading || !rawContent.trim()
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary-700 text-white hover:bg-primary-800 shadow-md hover:shadow-lg'
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner w-5 h-5 mr-3"></span>
                                    Structuring your paper...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Generate IEEE Paper
                                </>
                            )}
                        </button>
                    </div>

                    {/* Loading Message */}
                    {isLoading && (
                        <div className="mt-3 text-center text-sm text-gray-500">
                            <p>Analyzing content and structuring into IEEE sections...</p>
                            <p className="text-xs text-gray-400 mt-1">This may take 15-30 seconds for longer documents.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
