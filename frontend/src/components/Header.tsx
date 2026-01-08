/**
 * Header Component - Academic themed navigation
 */

import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">
                            IEEE Paper Generator
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors ${location.pathname === '/'
                                    ? 'text-primary-700'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/editor"
                            className={`text-sm font-medium transition-colors ${location.pathname === '/editor'
                                    ? 'text-primary-700'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Create Paper
                        </Link>
                        <a
                            href="https://www.ieee.org/publications/authors/author-templates.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            IEEE Guidelines
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
