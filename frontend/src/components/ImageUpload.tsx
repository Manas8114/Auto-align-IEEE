/**
 * Image Upload Component - Drag and drop with preview
 */

import { useCallback, useState } from 'react';
import type { UploadedImage } from '../types/paper';

interface ImageUploadProps {
    images: UploadedImage[];
    onImagesChange: (images: UploadedImage[]) => void;
    disabled?: boolean;
    maxImages?: number;
}

export default function ImageUpload({
    images,
    onImagesChange,
    disabled = false,
    maxImages = 10,
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragging(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processFiles = useCallback((files: FileList | null) => {
        if (!files || disabled) return;

        const newImages: UploadedImage[] = [];
        const remainingSlots = maxImages - images.length;

        Array.from(files).slice(0, remainingSlots).forEach((file) => {
            if (file.type.startsWith('image/')) {
                const preview = URL.createObjectURL(file);
                newImages.push({
                    file,
                    preview,
                    name: file.name,
                });
            }
        });

        if (newImages.length > 0) {
            onImagesChange([...images, ...newImages]);
        }
    }, [images, onImagesChange, disabled, maxImages]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    }, [processFiles]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
        e.target.value = ''; // Reset input
    }, [processFiles]);

    const removeImage = useCallback((index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(images[index].preview);
        onImagesChange(newImages);
    }, [images, onImagesChange]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Images</h2>
                <div className="text-sm text-gray-500">
                    {images.length} / {maxImages}
                </div>
            </div>

            {/* Drop Zone */}
            <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`drop-zone flex flex-col items-center justify-center cursor-pointer ${isDragging ? 'dragging' : ''
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    disabled={disabled || images.length >= maxImages}
                    className="hidden"
                />

                <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>

                <p className="text-sm text-gray-600 mb-1">
                    {isDragging ? 'Drop images here' : 'Drag & drop images here'}
                </p>
                <p className="text-xs text-gray-400">
                    or click to browse (PNG, JPG, up to 5MB each)
                </p>
            </label>

            {/* Image Previews */}
            {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 overflow-y-auto max-h-64">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative group bg-gray-100 rounded-lg overflow-hidden"
                        >
                            <img
                                src={img.preview}
                                alt={img.name}
                                className="w-full h-24 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all" />
                            <button
                                onClick={() => removeImage(index)}
                                disabled={disabled}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full 
                         opacity-0 group-hover:opacity-100 transition-opacity
                         flex items-center justify-center hover:bg-red-600"
                            >
                                ×
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                <p className="text-white text-xs truncate">{img.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-auto pt-4 text-xs text-gray-400">
                Images will be placed contextually with auto-generated captions.
            </div>
        </div>
    );
}
