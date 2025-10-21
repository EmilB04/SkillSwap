"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions about SkillSwap? We're here to help! Choose your preferred way to reach us.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                        <p className="text-gray-600 mb-4">Available 24/7 for your inquiries</p>
                        <a href="mailto:support@skillswap.com" className="text-green-600 hover:text-green-700 font-medium">
                            support@skillswap.com
                        </a>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
                        <p className="text-gray-600 mb-4">Mon-Fri, 9:00 AM - 5:00 PM (CET)</p>
                        <a href="tel:+4712345678" className="text-blue-600 hover:text-blue-700 font-medium">
                            +47 123 45 678
                        </a>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                        <p className="text-gray-600 mb-4">Quick responses during business hours</p>
                        <button className="text-purple-600 hover:text-purple-700 font-medium">
                            Start Chat (Coming Soon)
                        </button>
                    </div>
                </div>

                <div className="mt-16 mb-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-6">
                        Can't find what you're looking for? Check our comprehensive FAQ section.
                    </p>
                    <a
                        href="/faq"
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                        Visit FAQ Page
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    );
}