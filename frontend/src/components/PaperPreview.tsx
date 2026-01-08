/**
 * Paper Preview Component - Read-only display of structured paper
 */

import type { StructuredPaper } from '../types/paper';

interface PaperPreviewProps {
    paper: StructuredPaper;
}

export default function PaperPreview({ paper }: PaperPreviewProps) {
    return (
        <div className="paper-preview bg-white shadow-lg rounded-lg border">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-4">
                {paper.title}
            </h1>

            {/* Authors */}
            <p className="text-center text-gray-600 italic mb-6">
                {paper.authors}
            </p>

            {/* Abstract */}
            <div className="mb-6">
                <p className="text-sm">
                    <span className="font-bold italic">Abstract—</span>
                    <span className="italic">{paper.abstract}</span>
                </p>
            </div>

            {/* Keywords */}
            <div className="mb-6">
                <p className="text-sm italic">
                    <span className="font-bold">Keywords—</span>
                    {paper.keywords.join('; ')}
                </p>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Sections */}
            {paper.sections.map((section, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-sm font-bold uppercase text-center mb-3">
                        {toRoman(index + 1)}. {section.heading}
                    </h2>
                    {section.content.split('\n\n').map((para, pIndex) => (
                        <p key={pIndex} className="text-sm mb-2">
                            {para}
                        </p>
                    ))}
                </div>
            ))}

            {/* References */}
            {paper.references && paper.references.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-sm font-bold uppercase text-center mb-3">
                        References
                    </h2>
                    <div className="text-sm">
                        {paper.references.map((ref, index) => (
                            <p key={index} className="mb-1 pl-6 -indent-6">
                                [{index + 1}] {ref}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Convert number to Roman numeral
function toRoman(num: number): string {
    const romanNumerals: [number, string][] = [
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (const [value, symbol] of romanNumerals) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}
