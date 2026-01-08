/**
 * Text Editor Component - Large textarea for raw content input
 */

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function TextEditor({
    value,
    onChange,
    placeholder = "Paste your raw content here...\n\nThis can include:\n• Research notes\n• Draft paragraphs\n• Copied content from documents\n• Methodology descriptions\n• Results and findings\n\nThe AI will structure this into a properly formatted IEEE research paper.",
    disabled = false,
}: TextEditorProps) {
    const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
    const charCount = value.length;

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-900">Raw Content</h2>
                <div className="text-sm text-gray-500">
                    {wordCount.toLocaleString()} words · {charCount.toLocaleString()} characters
                </div>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="flex-1 content-textarea input-field font-serif"
                style={{ minHeight: '500px' }}
            />

            <div className="mt-3 text-xs text-gray-400">
                Supports long documents (10-20 pages). Your content will be enhanced to academic tone.
            </div>
        </div>
    );
}
