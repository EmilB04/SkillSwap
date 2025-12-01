"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";
import { useState, useRef } from "react";
import { UserProfile, UserProfileUpdate, mockUserProfile, skillsToString, parseSkills } from "./profileData";
import { ImageSourcePopup } from "@/app/components/ImageSourcePopup";
import { AvatarCreator } from "@/app/components/AvatarCreator";

export default function EditPage({ ctx }: RequestInfo) {
    // In production, fetch user profile from backend based on ctx.user.id
    // For now, using mock data
    const initialProfile = mockUserProfile;

    // Initialize form data with user profile
    const [formData, setFormData] = useState({
        id: initialProfile.id,
        name: initialProfile.name,
        email: initialProfile.email,
        displayName: initialProfile.displayName || "",
        phoneNumber: initialProfile.phoneNumber || "",
        bio: initialProfile.bio || "",
        location: initialProfile.location || "",
        website: initialProfile.website || "",
        skillsOffered: skillsToString(initialProfile.skillsOffered),
        skillsLearning: skillsToString(initialProfile.skillsLearning),
    });

    const [profileImage, setProfileImage] = useState<string | null>(
        initialProfile.profileImage
    );
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showAvatarCreator, setShowAvatarCreator] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setErrorMessage("Please upload a valid image file (JPG, PNG, GIF, or WebP)");
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrorMessage("Image size must be less than 5MB");
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                setErrorMessage("");
            };
            reader.onerror = () => {
                setErrorMessage("Failed to read image file");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        setShowPopup(false);
        fileInputRef.current?.click();
    };

    const handleAvatarClick = () => {
        setShowPopup(false);
        setShowAvatarCreator(true);
    };

    const handleAvatarSave = (avatarUrl: string) => {
        setProfileImage(avatarUrl);
        setShowAvatarCreator(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            // Parse skills and interests from comma-separated strings
            const skillsOffered = formData.skillsOffered
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
            
            const skillsLearning = formData.skillsLearning
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);

            // Prepare update data
            const updateData: UserProfileUpdate = {
                id: formData.id,
                name: formData.name,
                email: formData.email,
                displayName: formData.displayName || null,
                phoneNumber: formData.phoneNumber || null,
                bio: formData.bio || null,
                location: formData.location || null,
                website: formData.website || null,
                profileImage: profileImage,
                skillsOffered,
                skillsLearning,
            };

            // TODO: Call backend API to update profile
            // This should make a fetch request to an API endpoint in the worker
            // Example:
            // const response = await fetch('/api/profile', {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updateData),
            // });
            // if (!response.ok) throw new Error('Failed to update profile');
            
            // Temporary: Just show success message without actually saving
            console.log("Profile update data:", updateData);
            setSuccessMessage("Profile updated successfully! (Note: Backend save not yet implemented)");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ProfileLayout ctx={ctx}>
            <main className="max-w-4xl mx-auto p-6">
                {/* Page Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
                    <p className="text-gray-600">Update your personal information and profile details</p>
                </header>

                {/* Success Message */}
                {successMessage && (
                    <aside 
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                        role="alert"
                        aria-live="polite"
                    >
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            {/* Generated SVG with Claude Sonnet 4.5 */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-800 font-medium">{successMessage}</span>
                    </aside>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <aside 
                        className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                        role="alert"
                        aria-live="assertive"
                    >
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-800 font-medium">{errorMessage}</span>
                    </aside>
                )}

                <form onSubmit={handleSubmit} className="space-y-8" aria-labelledby="profile-form-heading">
                    <span id="profile-form-heading" className="sr-only">Edit your profile information</span>
                    
                    {/* Profile Picture Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="profile-picture-heading">
                        <h2 id="profile-picture-heading" className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
                        <div className="flex items-center gap-6">
                            <figure className="relative">
                                {profileImage ? (
                                    <img 
                                        src={profileImage} 
                                        alt="Profile picture preview" 
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-primary border-4 border-gray-100 flex items-center justify-center text-3xl font-bold text-white">
                                        {formData.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <button 
                                    type="button"
                                    onClick={() => setShowPopup(!showPopup)}
                                    className="absolute bottom-0 right-0 bg-primary hover:bg-primary-hover text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors duration-[280ms]"
                                    aria-label="Change profile picture"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        {/* Generated SVG with Claude Sonnet 4.5 */}
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                {showPopup && (
                                    <ImageSourcePopup 
                                        onUploadPicture={handleUploadClick}
                                        onCustomizeAvatar={handleAvatarClick}
                                        onClose={() => setShowPopup(false)}
                                    />
                                )}
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    aria-describedby="image-upload-help"
                                />
                            </figure>
                            <div id="image-upload-help">
                                <p className="text-sm font-medium text-gray-900 mb-1">Upload a new profile picture</p>
                                <p className="text-xs text-gray-500">JPG, PNG, GIF or WebP. Max size 5MB</p>
                                {profileImage && (
                                    <button
                                        type="button"
                                        onClick={() => setProfileImage(null)}
                                        className="mt-2 text-xs text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                                    >
                                        Remove picture
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Personal Information */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="personal-info-heading">
                        <h2 id="personal-info-heading" className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <legend className="sr-only">Enter your personal information</legend>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="Ola Nordmann"
                                />
                            </div>

                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="Snekker'n"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="+47 123 45 678"
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="Oslo, Norway"
                                />
                            </div>

                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </fieldset>
                    </section>

                    {/* About Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="about-heading">
                        <h2 id="about-heading" className="text-xl font-semibold text-gray-900 mb-6">About</h2>
                        <fieldset className="space-y-6">
                            <legend className="sr-only">Tell us about yourself</legend>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms] resize-none"
                                    placeholder="Tell others about yourself, your interests, and what you'd like to learn or teach..."
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    {formData.bio.length} / 500 characters
                                </p>
                            </div>

                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills I Offer
                                </label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skillsOffered"
                                    value={formData.skillsOffered}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="React, TypeScript, UI/UX Design, Node.js, Tailwind CSS"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Separate multiple skills with commas
                                </p>
                            </div>

                            <div>
                                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills I'm Learning (Interests)
                                </label>
                                <input
                                    type="text"
                                    id="interests"
                                    name="skillsLearning"
                                    value={formData.skillsLearning}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:outline focus:outline-2 focus:outline-primary focus:outline-offset-2 transition-all duration-[280ms]"
                                    placeholder="Python, Maskinlæring, GraphQL, Docker"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Separate multiple interests with commas
                                </p>
                            </div>
                        </fieldset>
                    </section>

                    {/* Action Buttons */}
                    <nav className="flex items-center justify-between gap-4 pt-4" aria-label="Form actions">
                        <a
                            href="/profile"
                            className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </a>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors duration-[280ms] flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </nav>
                </form>
            </main>
            {showAvatarCreator && (
                <AvatarCreator 
                    onSave={handleAvatarSave}
                    onCancel={() => setShowAvatarCreator(false)}
                />
            )}
        </ProfileLayout>
    );
}