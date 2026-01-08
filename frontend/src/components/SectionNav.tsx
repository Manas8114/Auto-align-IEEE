/**
 * Section Navigation Component - Navigate between paper sections
 */

import type { Section } from '../types/paper';

interface SectionNavProps {
    sections: Section[];
    activeSection: number;
    onSectionClick: (index: number) => void;
}

export default function SectionNav({
    sections,
    activeSection,
    onSectionClick
}: SectionNavProps) {
    const allSections = [
        { heading: 'Abstract', isDefault: true },
        ...sections.map(s => ({ heading: s.heading, isDefault: false })),
        { heading: 'References', isDefault: true },
    ];

    return (
        <nav className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                Sections
            </h3>
            <ul className="space-y-1">
                {allSections.map((section, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onSectionClick(index)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === index
                                ? 'bg-primary-100 text-primary-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {section.heading}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
