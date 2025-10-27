"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";
import { colors } from "../../../theme";
import { mockProfileData, parseSkills } from "../../../components/profile/profileData";

export function MyPage({ ctx }: RequestInfo) {
    // Use centralized profile data - override with real data from ctx.user when available
    const userData = {
        ...mockProfileData,
        name: ctx.user?.name || mockProfileData.name,
        email: ctx.user?.email || mockProfileData.email,
    };

    // Parse skills and interests from comma-separated strings
    const skillsOffered = parseSkills(userData.skills);
    const skillsLearning = parseSkills(userData.interests);

    const stats = {
        skillsOffered: skillsOffered.length,
        skillsLearning: skillsLearning.length,
        completedSwaps: 24,
        hoursExchanged: 156,
        rating: 4.8,
        reviews: 18,
    };

    const skills = {
        offered: skillsOffered,
        learning: skillsLearning,
    };

    return (
        <ProfileLayout ctx={ctx}>
            <main className="max-w-5xl mx-auto p-6">
                {/* Profile Header */}
                <header className="bg-white rounded-lg shadow-md p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Profile Picture */}
                        <figure className="flex-shrink-0">
                            <div 
                                className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl font-bold text-white"
                                style={{ 
                                    backgroundColor: colors.primary.main,
                                    borderColor: colors.primary.light,
                                }}
                            >
                                {userData.name.charAt(0).toUpperCase()}
                            </div>
                        </figure>

                        {/* Profile Info */}
                        <div className="flex-grow text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{userData.name}</h1>
                            <p className="text-lg text-gray-600 mb-3">{userData.displayName}</p>
                            <p className="text-gray-700 mb-4 max-w-2xl">{userData.bio}</p>
                            
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {userData.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Joined {userData.joinDate}
                                </span>
                                {userData.website && (
                                    <a 
                                        href={userData.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:underline"
                                        style={{ color: colors.primary.main }}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        Website
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Edit Button */}
                        <a
                            href="/profile/edit"
                            className="px-6 py-2 rounded-lg font-medium transition-colors duration-200 border-2"
                            style={{
                                backgroundColor: colors.primary.main,
                                color: 'white',
                                textWrap: 'nowrap',
                                borderColor: colors.primary.main,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary.hover;
                                e.currentTarget.style.borderColor = colors.primary.hover;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = colors.primary.main;
                                e.currentTarget.style.borderColor = colors.primary.main;
                            }}
                        >
                            Edit Profile
                        </a>
                    </div>
                </header>

                {/* Stats Grid */}
                <section aria-labelledby="stats-heading">
                    <h2 id="stats-heading" className="sr-only">Profile Statistics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <article className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary.main }}>
                                {stats.skillsOffered}
                            </div>
                            <div className="text-sm text-gray-600">Skills Offered</div>
                        </article>
                        <article className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary.main }}>
                                {stats.skillsLearning}
                            </div>
                            <div className="text-sm text-gray-600">Learning</div>
                        </article>
                        <article className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary.main }}>
                                {stats.completedSwaps}
                            </div>
                            <div className="text-sm text-gray-600">Completed</div>
                        </article>
                        <article className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary.main }}>
                                {stats.hoursExchanged}h
                            </div>
                            <div className="text-sm text-gray-600">Hours</div>
                        </article>
                        <article className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="text-3xl font-bold mb-1 flex items-center justify-center gap-1" style={{ color: colors.primary.main }}>
                                {stats.rating}
                                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="text-sm text-gray-600">Rating</div>
                        </article>
                        <article className="bg-white rounded-lg shadow-md p-4 text-center">
                            <div className="text-3xl font-bold mb-1" style={{ color: colors.primary.main }}>
                                {stats.reviews}
                            </div>
                            <div className="text-sm text-gray-600">Reviews</div>
                        </article>
                    </div>
                </section>

                {/* Skills Sections */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Skills I Offer */}
                    <section className="bg-white rounded-lg shadow-md p-6" aria-labelledby="skills-offered-heading">
                        <h2 id="skills-offered-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Skills I Offer
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.offered.map((skill, index) => (
                                <span 
                                    key={index}
                                    className="px-4 py-2 rounded-full text-sm font-medium"
                                    style={{
                                        backgroundColor: colors.primary.main,
                                        color: 'white',
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <button
                            className="mt-4 text-sm font-medium hover:underline"
                            style={{ color: colors.primary.main }}
                        >
                            + Add more skills
                        </button>
                    </section>

                    {/* Skills I'm Learning */}
                    <section className="bg-white rounded-lg shadow-md p-6" aria-labelledby="skills-learning-heading">
                        <h2 id="skills-learning-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                            Skills I'm Learning
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.learning.map((skill, index) => (
                                <span 
                                    key={index}
                                    className="px-4 py-2 rounded-full text-sm font-medium border-2"
                                    style={{
                                        borderColor: colors.primary.main,
                                        color: colors.primary.main,
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <button
                            className="mt-4 text-sm font-medium hover:underline"
                            style={{ color: colors.primary.main }}
                        >
                            + Add more interests
                        </button>
                    </section>
                </div>

                {/* Contact Information */}
                <section className="bg-white rounded-lg shadow-md p-6" aria-labelledby="contact-heading">
                    <h2 id="contact-heading" className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-500">Email</div>
                                <div className="text-sm font-medium text-gray-900">{userData.email}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div>
                                <div className="text-xs text-gray-500">Phone</div>
                                <div className="text-sm font-medium text-gray-900">{userData.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </ProfileLayout>
    );
}
