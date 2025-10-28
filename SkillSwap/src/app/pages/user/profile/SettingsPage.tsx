"use client";

import { ProfileLayout } from "./ProfileLayout";
import { RequestInfo } from "rwsdk/worker";
import { useState } from "react";
import { colors } from "../../../theme";

export default function SettingsPage({ ctx }: RequestInfo) {
    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState({
        newMessages: true,
        swapRequests: true,
        swapConfirmations: true,
        reviews: true,
        newsletter: false,
        promotions: false,
    });

    const [pushNotifications, setPushNotifications] = useState({
        newMessages: true,
        swapRequests: true,
        swapConfirmations: true,
        reviews: false,
    });

    // Privacy settings
    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: "public" as "public" | "members" | "private",
        showEmail: false,
        showPhone: false,
        showLocation: true,
        allowMessages: true,
    });

    // System settings
    const [systemSettings, setSystemSettings] = useState({
        language: "no",
        timezone: "Europe/Oslo",
        theme: "light" as "light" | "dark" | "auto",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSaveSettings = async () => {
        setIsSaving(true);
        setSuccessMessage("");

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setSuccessMessage("Settings saved successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 1000);

        // TODO: Implement actual API call to save settings
    };

    const handleEmailNotificationChange = (key: keyof typeof emailNotifications) => {
        setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePushNotificationChange = (key: keyof typeof pushNotifications) => {
        setPushNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePrivacyChange = (key: keyof typeof privacySettings, value: any) => {
        setPrivacySettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSystemChange = (key: keyof typeof systemSettings, value: any) => {
        setSystemSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <ProfileLayout ctx={ctx}>
            <main className="max-w-4xl mx-auto p-6">
                {/* Page Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your account preferences and settings</p>
                </header>

                {/* Success Message */}
                {successMessage && (
                    <aside 
                        className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
                        role="alert"
                        aria-live="polite"
                    >
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-800 font-medium">{successMessage}</span>
                    </aside>
                )}

                <div className="space-y-6">
                    {/* Notification Settings */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="notifications-heading">
                        <h2 id="notifications-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            Notifications
                        </h2>

                        {/* Email Notifications */}
                        <article className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Email Notifications</h3>
                            <fieldset className="space-y-3">
                                <legend className="sr-only">Configure email notification preferences</legend>
                                {[
                                    { key: "newMessages" as const, label: "New messages", description: "Receive emails when you get new messages" },
                                    { key: "swapRequests" as const, label: "Swap requests", description: "Get notified about new skill swap requests" },
                                    { key: "swapConfirmations" as const, label: "Swap confirmations", description: "Receive confirmations for completed swaps" },
                                    { key: "reviews" as const, label: "Reviews", description: "Get notified when someone reviews you" },
                                    { key: "newsletter" as const, label: "Newsletter", description: "Receive our monthly newsletter with tips and updates" },
                                    { key: "promotions" as const, label: "Promotions", description: "Get emails about special offers and features" },
                                ].map(({ key, label, description }) => (
                                    <label key={key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={emailNotifications[key]}
                                            onChange={() => handleEmailNotificationChange(key)}
                                            className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2"
                                            style={{ accentColor: colors.primary.main }}
                                            aria-describedby={`${key}-desc`}
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-gray-900">{label}</span>
                                            <p id={`${key}-desc`} className="text-xs text-gray-500">{description}</p>
                                        </div>
                                    </label>
                                ))}
                            </fieldset>
                        </article>

                        {/* Push Notifications */}
                        <article>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Push Notifications</h3>
                            <fieldset className="space-y-3">
                                <legend className="sr-only">Configure push notification preferences</legend>
                                {[
                                    { key: "newMessages" as const, label: "New messages", description: "Get instant notifications for new messages" },
                                    { key: "swapRequests" as const, label: "Swap requests", description: "Instant alerts for skill swap requests" },
                                    { key: "swapConfirmations" as const, label: "Swap confirmations", description: "Instant alerts for swap completions" },
                                    { key: "reviews" as const, label: "Reviews", description: "Get notified when someone reviews you" },
                                ].map(({ key, label, description }) => (
                                    <label key={key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={pushNotifications[key]}
                                            onChange={() => handlePushNotificationChange(key)}
                                            className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2"
                                            style={{ accentColor: colors.primary.main }}
                                            aria-describedby={`push-${key}-desc`}
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-gray-900">{label}</span>
                                            <p id={`push-${key}-desc`} className="text-xs text-gray-500">{description}</p>
                                        </div>
                                    </label>
                                ))}
                            </fieldset>
                        </article>
                    </section>

                    {/* Privacy Settings */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="privacy-heading">
                        <h2 id="privacy-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Privacy & Security
                        </h2>

                        <fieldset className="space-y-4">
                            <legend className="sr-only">Privacy and security settings</legend>
                            
                            {/* Profile Visibility */}
                            <div>
                                <label htmlFor="profile-visibility" className="block text-sm font-medium text-gray-900 mb-2">
                                    Profile Visibility
                                </label>
                                <select
                                    id="profile-visibility"
                                    value={privacySettings.profileVisibility}
                                    onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all cursor-pointer"
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
                                    aria-describedby="visibility-help"
                                >
                                    <option value="public">Public - Anyone can view your profile</option>
                                    <option value="members">Members Only - Only registered members can view</option>
                                    <option value="private">Private - Only you can view your profile</option>
                                </select>
                                <p id="visibility-help" className="sr-only">Choose who can view your profile</p>
                            </div>

                            {/* Contact Information Visibility */}
                            <fieldset className="space-y-3 pt-2">
                                <legend className="text-sm font-medium text-gray-900 mb-3">Show on Profile</legend>
                                {[
                                    { key: "showEmail" as const, label: "Email address", description: "Display your email on your public profile" },
                                    { key: "showPhone" as const, label: "Phone number", description: "Display your phone number on your public profile" },
                                    { key: "showLocation" as const, label: "Location", description: "Display your location on your public profile" },
                                ].map(({ key, label, description }) => (
                                    <label key={key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={privacySettings[key]}
                                            onChange={() => handlePrivacyChange(key, !privacySettings[key])}
                                            className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2"
                                            style={{ accentColor: colors.primary.main }}
                                            aria-describedby={`privacy-${key}-desc`}
                                        />
                                        <div className="flex-1">
                                            <span className="text-sm font-medium text-gray-900">{label}</span>
                                            <p id={`privacy-${key}-desc`} className="text-xs text-gray-500">{description}</p>
                                        </div>
                                    </label>
                                ))}
                            </fieldset>

                            {/* Messaging */}
                            <div className="pt-2">
                                <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={privacySettings.allowMessages}
                                        onChange={() => handlePrivacyChange("allowMessages", !privacySettings.allowMessages)}
                                        className="mt-1 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-offset-2"
                                        style={{ accentColor: colors.primary.main }}
                                        aria-describedby="allow-messages-desc"
                                    />
                                    <div className="flex-1">
                                        <span className="text-sm font-medium text-gray-900">Allow messages</span>
                                        <p id="allow-messages-desc" className="text-xs text-gray-500">Allow other members to send you messages</p>
                                    </div>
                                </label>
                            </div>
                        </fieldset>
                    </section>

                    {/* System Settings */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="system-heading">
                        <h2 id="system-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            System Preferences
                        </h2>

                        <form className="space-y-4">
                            {/* Language */}
                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-900 mb-2">
                                    Language
                                </label>
                                <select
                                    id="language"
                                    value={systemSettings.language}
                                    onChange={(e) => handleSystemChange("language", e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all cursor-pointer"
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
                                    aria-describedby="language-help"
                                >
                                    <option value="no">Norsk (Norwegian)</option>
                                    <option value="en">English</option>
                                    <option value="sv">Svenska (Swedish)</option>
                                    <option value="da">Dansk (Danish)</option>
                                </select>
                                <p id="language-help" className="sr-only">Select your preferred language</p>
                            </div>

                            {/* Timezone */}
                            <div>
                                <label htmlFor="timezone" className="block text-sm font-medium text-gray-900 mb-2">
                                    Timezone
                                </label>
                                <select
                                    id="timezone"
                                    value={systemSettings.timezone}
                                    onChange={(e) => handleSystemChange("timezone", e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all cursor-pointer"
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
                                    aria-describedby="timezone-help"
                                >
                                    <option value="Europe/Oslo">Europe/Oslo (GMT+1)</option>
                                    <option value="Europe/Stockholm">Europe/Stockholm (GMT+1)</option>
                                    <option value="Europe/Copenhagen">Europe/Copenhagen (GMT+1)</option>
                                    <option value="Europe/London">Europe/London (GMT+0)</option>
                                    <option value="America/New_York">America/New York (GMT-5)</option>
                                    <option value="America/Los_Angeles">America/Los Angeles (GMT-8)</option>
                                </select>
                                <p id="timezone-help" className="sr-only">Select your timezone</p>
                            </div>

                            {/* Theme */}
                            <div>
                                <label htmlFor="theme" className="block text-sm font-medium text-gray-900 mb-2">
                                    Theme
                                </label>
                                <select
                                    id="theme"
                                    value={systemSettings.theme}
                                    onChange={(e) => handleSystemChange("theme", e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-all cursor-pointer"
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
                                    aria-describedby="theme-help"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto (system preference)</option>
                                </select>
                                <p id="theme-help" className="sr-only">Select your preferred theme</p>
                            </div>
                        </form>
                    </section>

                    {/* Account Management */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6" aria-labelledby="account-heading">
                        <h2 id="account-heading" className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" style={{ color: colors.primary.main }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account Management
                        </h2>

                        <nav className="space-y-4" aria-label="Account actions">
                            <article className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Change Password</h3>
                                <p className="text-xs text-gray-600 mb-3">Keep your account secure by regularly updating your password</p>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium rounded-lg border-2 transition-colors cursor-pointer"
                                    style={{
                                        borderColor: colors.primary.main,
                                        color: colors.primary.main,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = colors.primary.main;
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = colors.primary.main;
                                    }}
                                    aria-label="Change your password"
                                >
                                    Change Password
                                </button>
                            </article>

                            <article className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Download Your Data</h3>
                                <p className="text-xs text-gray-600 mb-3">Download a copy of all your data including profile, messages, and swap history</p>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium rounded-lg border-2 transition-colors cursor-pointer"
                                    style={{
                                        borderColor: colors.primary.main,
                                        color: colors.primary.main,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = colors.primary.main;
                                        e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = colors.primary.main;
                                    }}
                                    aria-label="Request a copy of your data"
                                >
                                    Request Data Export
                                </button>
                            </article>

                            <article className="p-4 bg-red-50 rounded-lg border border-red-200" role="alert" aria-labelledby="delete-account-heading">
                                <h3 id="delete-account-heading" className="text-sm font-medium text-red-900 mb-2">Delete Account</h3>
                                <p className="text-xs text-red-700 mb-3">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
                                    aria-label="Permanently delete your account"
                                >
                                    Delete Account
                                </button>
                            </article>
                        </nav>
                    </section>

                    {/* Save Button */}
                    <nav className="flex justify-end gap-4 pt-4" aria-label="Settings actions">
                        <button
                            type="button"
                            onClick={handleSaveSettings}
                            disabled={isSaving}
                            className="px-8 py-3 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            style={{
                                backgroundColor: colors.primary.main,
                            }}
                            onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = colors.primary.hover)}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                            aria-label={isSaving ? "Saving settings" : "Save all settings"}
                        >
                            {isSaving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Save All Settings</span>
                                </>
                            )}
                        </button>
                    </nav>
                </div>
            </main>
        </ProfileLayout>
    );
}