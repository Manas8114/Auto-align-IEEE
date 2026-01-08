/**
 * Landing Page - Main entry point with hero section
 */

import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-4xl mx-auto text-center animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full text-primary-700 text-sm font-medium mb-8">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        IEEE-Compliant Formatting
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Convert Raw Content into{' '}
                        <span className="text-primary-600">IEEE-Compliant</span>{' '}
                        Research Papers Instantly
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Paste your notes, upload your figures, and download a fully formatted
                        Microsoft Word document ready for submission. Zero manual formatting required.
                    </p>

                    {/* CTA Button */}
                    <Link
                        to="/editor"
                        className="inline-flex items-center px-8 py-4 bg-primary-700 text-white text-lg font-semibold rounded-xl
                       hover:bg-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl
                       transform hover:-translate-y-0.5"
                    >
                        Create IEEE Paper
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Paste Your Content</h3>
                            <p className="text-gray-600">
                                Paste your raw notes, drafts, or copied content.
                                No need to format anything.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Upload Images</h3>
                            <p className="text-gray-600">
                                Add figures, diagrams, and graphs.
                                AI generates captions automatically.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Download .docx</h3>
                            <p className="text-gray-600">
                                Get your IEEE-formatted Word document
                                with two-column layout, ready for submission.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features List */}
            <section className="py-16 px-4 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                        IEEE Formatting Features
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            'Two-column layout (body sections)',
                            'Times New Roman fonts',
                            'Proper heading hierarchy',
                            'Numbered figure captions',
                            'Justified text alignment',
                            'A4 page size',
                            'IEEE section structure',
                            'Auto-generated references',
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
                    <p>
                        Designed for B.Tech, M.Tech students, research scholars, and IEEE paper authors.
                    </p>
                    <p className="mt-2">
                        Your content is never stored. Privacy-first design.
                    </p>
                </div>
            </footer>
        </div>
    );
}
