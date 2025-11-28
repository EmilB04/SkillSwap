"use client";

import { Job as JobType } from "@/types/job";
import { colors } from "@/app/theme";
import Header from "../components/Header";
import Footer from '../components/Footer';
import JobCard from "../components/JobCard";
import { useState, useEffect } from "react";

// Mock users data - in the future this will come from the database
const mockUsers = [
    {
        id: 1,
        name: "Ola Nordmann",
        displayName: "@olanordmann",
        profileImage: null,
        avatar: "ON",
    },
    {
        id: 2,
        name: "Kari Hansen",
        displayName: "@karihansen",
        profileImage: null,
        avatar: "KH",
    },
    {
        id: 3,
        name: "Per Olsen",
        displayName: "@perolsen",
        profileImage: null,
        avatar: "PO",
    },
    {
        id: 4,
        name: "Lisa Berg",
        displayName: "@lisaberg",
        profileImage: null,
        avatar: "LB",
    },
    {
        id: 5,
        name: "Tom Jensen",
        displayName: "@tomjensen",
        profileImage: null,
        avatar: "TJ",
    },
];

export default function Job({ params }: { params: { slug: string } }) {
    const jobSlug = params.slug;
    const [job, setJob] = useState<JobType | null>(null);
    const [relatedJobs, setRelatedJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchJob() {
            try {
                // Fetch specific ad by slug
                const response = await fetch(`/api/v1/ads?slug=${jobSlug}`);
                const result = await response.json() as { success: boolean; data?: any };
                
                if (result.success && result.data) {
                    const ad = result.data;
                    const fetchedJob: JobType = {
                        id: ad.id,
                        slug: ad.slug || `${ad.category?.toLowerCase()}-${ad.id}`,
                        title: ad.title,
                        description: ad.description,
                        userId: ad.userId,
                        category: ad.category || 'Other',
                        payment: ad.payment || 'Negotiable',
                        imageUrl: ad.imageUrl || '/src/app/assets/gardening.jpeg',
                        date: ad.date ? new Date(ad.date) : new Date(),
                        location: ad.location || 'Location not specified',
                        createdAt: ad.createdAt ? new Date(ad.createdAt) : undefined,
                        updatedAt: ad.updatedAt ? new Date(ad.updatedAt) : undefined,
                    };
                    setJob(fetchedJob);
                    
                    // Fetch all ads to get related ones
                    const allAdsResponse = await fetch('/api/v1/ads');
                    const allAdsResult = await allAdsResponse.json() as { success: boolean; data?: any[] };
                    
                    if (allAdsResult.success && allAdsResult.data) {
                        const allJobs: JobType[] = allAdsResult.data.map((ad: any) => ({
                            id: ad.id,
                            slug: ad.slug || `${ad.category?.toLowerCase()}-${ad.id}`,
                            title: ad.title,
                            description: ad.description,
                            userId: ad.userId,
                            category: ad.category || 'Other',
                            payment: ad.payment || 'Negotiable',
                            imageUrl: ad.imageUrl || '/src/app/assets/gardening.jpeg',
                            date: ad.date ? new Date(ad.date) : new Date(),
                            location: ad.location || 'Location not specified',
                        }));
                        
                        const related = allJobs.filter((j) => j.category === fetchedJob.category && j.id !== fetchedJob.id).slice(0, 3);
                        setRelatedJobs(related);
                    }
                }
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchJob();
    }, [jobSlug]);
    
    // Find the user who published this job
    const publisher = job ? mockUsers.find((u) => u.id === job.userId) : null;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg">Loading job details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <Header />
                
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
                        <p className="text-gray-600 mb-8">The job you're looking for doesn't exist.</p>
                        <a 
                            href="/explore" 
                            className="inline-block px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all"
                            style={{ backgroundColor: colors.primary.main }}
                        >
                            Back to Explore
                        </a>
                    </div>
                </main>
                
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Header />
            
            <main className="flex-grow py-12">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Back button */}
                    <a 
                        href="/explore" 
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Explore
                    </a>

                {/* Job card */}
                <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Image */}
                    <div className="relative overflow-hidden h-96">
                        <img 
                            src={job.imageUrl} 
                            alt={job.title} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Category badge on image */}
                        <div className="absolute top-6 left-6">
                            <span 
                                className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-white/90 backdrop-blur-sm"
                                style={{ color: colors.primary.main }}
                            >
                                {job.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {job.title}
                        </h1>

                        {/* Meta info */}
                        <div className="flex items-center gap-6 mb-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>
                                    {job.date.toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            
                            <div className="flex items-center gap-2 font-semibold text-lg" style={{ color: colors.primary.main }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{job.payment}</span>
                            </div>
                        </div>

                        {/* Publisher information */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Published by</h2>
                            {publisher ? (
                                <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                                    {/* User Avatar */}
                                    <div className="flex-shrink-0">
                                        {publisher.profileImage ? (
                                            <img
                                                src={publisher.profileImage}
                                                alt={publisher.name}
                                                className="w-16 h-16 rounded-full object-cover border-4"
                                                style={{ borderColor: colors.primary.main }}
                                            />
                                        ) : (
                                            <div
                                                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold border-4"
                                                style={{
                                                    backgroundColor: colors.primary.main,
                                                    borderColor: colors.primary.light,
                                                }}
                                            >
                                                {publisher.avatar}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* User Info */}
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {publisher.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {publisher.displayName}
                                        </p>
                                    </div>
                                    
                                    {/* View Profile Button */}
                                    <a
                                        href={"#"}
                                        className="px-4 py-2 rounded-lg border-2 font-medium hover:bg-gray-100 transition-colors"
                                        style={{ 
                                            borderColor: colors.primary.main,
                                            color: colors.primary.main 
                                        }}
                                    >
                                        View Profile
                                    </a>
                                </div>
                            ) : (
                                <p className="text-gray-600">User information not available</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Description</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {job.description}
                            </p>
                        </div>

                        {/* Location */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Location</h2>
                            <div className="flex items-start gap-2 text-gray-700 text-lg mb-4">
                                <svg className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="leading-relaxed">{job.location}</span>
                            </div>
                            
                            {/* Embedded Interactive Map */}
                            <div className="rounded-xl overflow-hidden border-2 border-gray-200 h-80">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(job.location)}`}
                                    allowFullScreen
                                />
                            </div>
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-3 text-sm font-medium hover:underline"
                                style={{ color: colors.primary.main }}
                            >
                                Open in Google Maps
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>

                        {/* Action Button */}
                        <a 
                            href={`/profile/messages`}
                            className="block w-full py-4 rounded-xl text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 text-center"
                            style={{ backgroundColor: colors.primary.main }}
                        > 
                            Request This Job
                        </a>
                    </div>
                </article>

                {/* Related Jobs Section */}
                <section className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Opportunities</h2>
                    {relatedJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedJobs.map((relatedJob) => (
                                <JobCard 
                                    key={relatedJob.id}
                                    job={relatedJob}
                                    category={relatedJob.category}
                                    payment={relatedJob.payment}
                                    imageUrl={relatedJob.imageUrl}
                                    date={relatedJob.date}
                                    location={relatedJob.location}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-16 text-center relative overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: colors.primary.main }} />
                            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: colors.primary.light }} />
                            
                            <div className="max-w-md mx-auto relative z-10">
                                <div className="mb-6 relative">
                                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" 
                                         style={{ backgroundColor: `${colors.primary.main}15` }}>
                                        <svg 
                                            className="w-10 h-10" 
                                            style={{ color: colors.primary.main }}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Related Opportunities</h3>
                                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                                    We couldn't find similar opportunities at the moment, but there are plenty of other exciting options waiting for you!
                                </p>
                                <a 
                                    href="/explore" 
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
                                    style={{ backgroundColor: colors.primary.main }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Explore All Opportunities
                                </a>
                            </div>
                        </div>
                    )}
                </section>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}