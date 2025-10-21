"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";
import { useState } from "react";
import { colors } from "@/app/theme";

export default function EditPage({ ctx }: RequestInfo) {
    const [formData, setFormData] = useState({
        name: ctx?.user?.name || "",
        email: ctx?.user?.email || "",
        displayName: "",
        phoneNumber: "",
        bio: "",
        location: "",
        website: "",
        skills: "",
    });

    const [profileImage, setProfileImage] = useState<string>("/src/app/assets/icons/boy-icon.png");
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMessage("");

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1000);

        // TODO: Implement actual API call to update profile
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

                <form onSubmit={handleSubmit} className="space-y-8" aria-labelledby="profile-form-heading">
                    <span id="profile-form-heading" className="sr-only">Edit your profile information</span>
                    
                    {/* Profile Picture Section */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="profile-picture-heading">
                        <h2 id="profile-picture-heading" className="text-xl font-semibold text-gray-900 mb-4">Profile Picture</h2>
                        <div className="flex items-center gap-6">
                            <figure className="relative">
                                <img 
                                    src={profileImage} 
                                    alt="Current profile picture" 
                                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                                />
                                <label 
                                    htmlFor="profile-image-upload" 
                                    className="absolute bottom-0 right-0 text-white rounded-full p-2 cursor-pointer shadow-lg transition-colors"
                                    style={{ backgroundColor: colors.primary.main }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                                    aria-label="Upload new profile picture"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        {/* Generated SVG with Claude Sonnet 4.5 */}
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </label>
                                <input 
                                    id="profile-image-upload" 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    aria-describedby="image-upload-help"
                                />
                            </figure>
                            <div id="image-upload-help">
                                <p className="text-sm font-medium text-gray-900 mb-1">Upload a new profile picture</p>
                                <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 5MB</p>
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all resize-none"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
                                    placeholder="Tell others about yourself, your interests, and what you'd like to learn or teach..."
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    {formData.bio.length} / 500 characters
                                </p>
                            </div>

                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills & Interests
                                </label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all"
                                    style={{
                                        '--tw-ring-color': `${colors.primary.main}33`,
                                    } as React.CSSProperties & { '--tw-ring-color': string }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = colors.primary.main;
                                        e.target.style.outline = `2px solid ${colors.primary.main}`;
                                        e.target.style.outlineOffset = '2px';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '';
                                        e.target.style.outline = '';
                                        e.target.style.outlineOffset = '';
                                    }}
                                    placeholder="Photography, Web Development, Cooking, Guitar"
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    Separate multiple skills with commas
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
                            className="px-8 py-3 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                            style={{
                                backgroundColor: colors.primary.main,
                            }}
                            onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = colors.primary.hover)}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
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
        </ProfileLayout>
    );
}