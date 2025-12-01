"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { RequestInfo } from "rwsdk/worker";
import { UserProfile, mockUserProfile, formatDate } from "./profileData";
import { useState, useEffect } from "react";
import { ReviewsSection } from "@/app/components/profile/ReviewsSection";

export function ViewProfilePage({ ctx, params }: RequestInfo & { params: { userId: string } }) {
    const userId = params.userId;
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/v1/profile/${userId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch profile: ${response.statusText}`);
                }
                
                const result = await response.json() as { success: boolean; data?: any; error?: any };
                
                // Fetch reviews to calculate stats
                const reviewsResponse = await fetch(`/api/v1/reviews?receiverId=${userId}`);
                let stats = {
                    completedSwaps: 24, // Hardcoded for demo
                    hoursExchanged: 156, // Hardcoded for demo
                    rating: 0,
                    reviews: 0,
                };
                
                if (reviewsResponse.ok) {
                    const reviewsResult = await reviewsResponse.json() as { success: boolean; data?: any[] };
                    if (reviewsResult.success && reviewsResult.data) {
                        const reviewsList = reviewsResult.data;
                        setReviews(reviewsList);
                        stats.reviews = reviewsList.length;
                        if (reviewsList.length > 0) {
                            const totalRating = reviewsList.reduce((sum: number, review: any) => sum + review.rating, 0);
                            stats.rating = Math.round((totalRating / reviewsList.length) * 10) / 10;
                        }
                    }
                }
                
                if (result.success && result.data) {
                    const profileData = result.data;
                    // Map DB data to UserProfile format
                    setUserData({
                        id: userId,
                        name: profileData.user?.name || "Unknown User",
                        email: profileData.user?.email || "",
                        role: profileData.user?.role || "user",
                        displayName: profileData.displayName,
                        phoneNumber: profileData.phoneNumber,
                        bio: profileData.bio,
                        location: profileData.location,
                        website: profileData.website,
                        profileImage: profileData.profileImageUrl,
                        skillsOffered: profileData.skillsOffered ? profileData.skillsOffered.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                        skillsLearning: profileData.skillsLearning ? profileData.skillsLearning.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
                        stats,
                        createdAt: profileData.createdAt?.toString(),
                        updatedAt: profileData.updatedAt?.toString(),
                    });
                } else {
                    setError("Profile not found");
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error instanceof Error ? error.message : "An error occurred");
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
                        <p className="text-gray-600 mb-8">{error || "The profile you're looking for doesn't exist."}</p>
                        <a 
                            href="/explore" 
                            className="inline-block px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-md hover:shadow-lg transition-all duration-[280ms]"
                        >
                            Back to Explore
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const initials = userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            
            <main className="flex-grow py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back button */}
                    <a 
                        href="/explore" 
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-[280ms]"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Explore
                    </a>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                                {/* Profile Image */}
                                <div className="flex flex-col items-center mb-6">
                                    {userData.profileImage ? (
                                        <img
                                            src={userData.profileImage}
                                            alt={userData.name}
                                            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold border-4 border-primary-light">
                                            {initials}
                                        </div>
                                    )}
                                    <h1 className="text-2xl font-bold text-gray-900 mt-4">
                                        {userData.name}
                                    </h1>
                                    <p className="text-gray-600">{userData.displayName}</p>
                                    <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                                        <p className="text-3xl font-bold text-gray-900">
                                            {userData.stats.completedSwaps}
                                        </p>
                                        <p className="text-sm text-gray-600 font-medium">Completed</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                                        <p className="text-3xl font-bold text-gray-900">
                                            {userData.stats.hoursExchanged}
                                        </p>
                                        <p className="text-sm text-gray-600 font-medium">Hours</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                                        <div className="flex items-center justify-center gap-1">
                                            <p className="text-3xl font-bold text-gray-900">
                                                {userData.stats.rating.toFixed(1)}
                                            </p>
                                            <svg
                                                className="w-6 h-6 text-amber-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">Rating</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                                        <p className="text-3xl font-bold text-gray-900">
                                            {userData.stats.reviews}
                                        </p>
                                        <p className="text-sm text-gray-600 font-medium">Reviews</p>
                                    </div>
                                </div>

                                {/* Contact Button */}
                                <a
                                    href={`/profile/messages`}
                                    className="w-full block text-center px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold shadow-md hover:shadow-lg transition-all duration-[280ms]"
                                >
                                    Send Message
                                </a>
                            </div>
                        </div>

                        {/* Right Column - Profile Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Bio Section */}
                            {userData.bio && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        About
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                                </div>
                            )}

                            {/* Contact Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Information
                                </h2>
                                <div className="space-y-3">
                                    {userData.location && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Location</p>
                                                <p className="text-gray-900">{userData.location}</p>
                                            </div>
                                        </div>
                                    )}
                                    {userData.phoneNumber && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Phone</p>
                                                <p className="text-gray-900">{userData.phoneNumber}</p>
                                            </div>
                                        </div>
                                    )}
                                    {userData.website && (
                                        <div className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Website</p>
                                                <a 
                                                    href={userData.website} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    {userData.website}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Skills Offered */}
                            {userData.skillsOffered && userData.skillsOffered.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                        Skills Offered
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.skillsOffered.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills Learning */}
                            {userData.skillsLearning && userData.skillsLearning.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Wants to Learn
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.skillsLearning.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reviews Section */}
                            {reviews.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <ReviewsSection reviews={reviews} maxDisplay={5} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
