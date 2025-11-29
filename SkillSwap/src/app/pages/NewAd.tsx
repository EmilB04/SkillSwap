"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { RequestInfo } from "rwsdk/worker";
import { colors } from "../theme";
import { useState } from "react";

export default function NewAd({ ctx }: RequestInfo) {
    // Check if user is loged in
    if (!ctx.user?.id) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: colors.secondary.pale }}>
                <Header ctx={ctx} />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primary.main }}>
                            Please Log In
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            You need to be logged in to create an ad
                        </p>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="px-6 py-3 rounded-lg text-white font-medium"
                            style={{ backgroundColor: colors.primary.main }}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    
    const [tradeType, setTradeType] = useState<"swap" | "cash" | null>("swap");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        skillOffered: "",
        skillWanted: "",
        description: "",
        duration: "",
        location: "",
        price: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        const payment = tradeType === "cash" ? `$${formData.price}/hour` : "Skill swap";
        
        // Create the ad data
        const adData = {
            slug: slug,
            title: formData.title,
            description: formData.description,
            userId: ctx.user!.id,
            category: formData.category,
            payment: payment,
            imageUrl: imagePreviews[0] || "/src/app/assets/default-image.png",
            location: formData.location,
            date: new Date().toISOString(),
        };
        
        try {
            const response = await fetch('/api/v1/ads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adData),
            });
            
            const result = await response.json() as { success: boolean; error?: { message: string } };
            
            if (result.success) {
                alert('Ad created successfully! 🎉');
                window.location.href = `/ads/${adData.slug}`;
            } else {
                alert('Failed to create ad: ' + (result.error?.message));
            }
        } catch (error) {
            console.error('Error creating ad:', error);
            alert('Failed to create ad. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles = Array.from(files).slice(0, 5 - selectedImages.length); // Max 5 images
        const newPreviews: string[] = [];

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                if (newPreviews.length === newFiles.length) {
                    setImagePreviews([...imagePreviews, ...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });

        setSelectedImages([...selectedImages, ...newFiles]);
    };

    const removeImage = (index: number) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.secondary.pale }}>
            <Header ctx={ctx} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 
                        className="text-3xl sm:text-4xl font-bold mb-4"
                        style={{ color: colors.primary.main }}
                    >
                        Create a Skill Swap
                    </h1>
                    <p className="text-lg text-gray-600">
                        Share your skills and find someone to learn from
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                    <div className="space-y-6">
                        {/* Trade Type Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Type of Trade
                            </label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setTradeType("swap")}
                                    className="flex-1 px-6 py-4 border-2 rounded-lg font-medium transition-all cursor-pointer"
                                    style={{
                                        borderColor: tradeType === "swap" ? colors.primary.main : colors.neutral.gray[300],
                                        backgroundColor: tradeType === "swap" ? colors.secondary.pale : "white",
                                        color: tradeType === "swap" ? colors.primary.main : colors.neutral.gray[700],
                                    }}
                                >
                                    Swap
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTradeType("cash")}
                                    className="flex-1 px-6 py-4 border-2 rounded-lg font-medium transition-all cursor-pointer"
                                    style={{
                                        borderColor: tradeType === "cash" ? colors.primary.main : colors.neutral.gray[300],
                                        backgroundColor: tradeType === "cash" ? colors.secondary.pale : "white",
                                        color: tradeType === "cash" ? colors.primary.main : colors.neutral.gray[700],
                                    }}
                                >
                                    Cash
                                </button>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images
                            </label>
                            <div className="space-y-4">
                                <div 
                                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                                    style={{ borderColor: colors.neutral.gray[300] }}
                                    onClick={() => document.getElementById('imageUpload')?.click()}
                                >
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Click to upload images (max 5)
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB each
                                    </p>
                                </div>
                                
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img 
                                                    src={preview} 
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all cursor-text"
                                style={{ borderColor: colors.neutral.gray[300] }}
                                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                placeholder="Example: I want to learn Piano"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all cursor-pointer"
                                style={{ borderColor: colors.neutral.gray[300] }}
                                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="technology">Technology</option>
                                <option value="languages">Languages</option>
                                <option value="arts">Arts & Crafts</option>
                                <option value="music">Music</option>
                                <option value="sports">Sports & Fitness</option>
                                <option value="cooking">Cooking</option>
                                <option value="business">Business</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Skill Offered - Only for Swap */}
                        {tradeType === "swap" && (
                            <div>
                                <label htmlFor="skillOffered" className="block text-sm font-medium text-gray-700 mb-2">
                                    Skill I Can Offer
                                </label>
                                <input
                                    type="text"
                                    id="skillOffered"
                                    name="skillOffered"
                                    value={formData.skillOffered}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all cursor-text"
                                    style={{ borderColor: colors.neutral.gray[300] }}
                                    onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                    onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                    placeholder="Example: Web Development, Piano, Guitar"
                                    required
                                />
                            </div>
                        )}

                        {/* Skill Wanted - Only for Swap */}
                        {tradeType === "swap" && (
                            <div>
                                <label htmlFor="skillWanted" className="block text-sm font-medium text-gray-700 mb-2">
                                    Skill I Want to Learn
                                </label>
                                <input
                                    type="text"
                                    id="skillWanted"
                                    name="skillWanted"
                                    value={formData.skillWanted}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all cursor-text"
                                    style={{ borderColor: colors.neutral.gray[300] }}
                                    onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                    onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                    placeholder="Example: Piano, Guitar, Music Theory"
                                    required
                                />
                            </div>
                        )}

                        {/* Price - Only for Cash */}
                        {tradeType === "cash" && (
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (NOK)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="1"
                                        className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none transition-all cursor-text"
                                        style={{ borderColor: colors.neutral.gray[300] }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                        onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                        placeholder="500"
                                        required
                                    />
                                    <span 
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium"
                                    >
                                        kr
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all resize-none cursor-text"
                                style={{ borderColor: colors.neutral.gray[300] }}
                                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                placeholder="Describe your offer and what you're looking for in detail..."
                                required
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                                Expected Duration
                            </label>
                            <select
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all cursor-pointer"
                                style={{ borderColor: colors.neutral.gray[300] }}
                                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                required
                            >
                                <option value="">Select duration</option>
                                <option value="1-2-weeks">1-2 weeks</option>
                                <option value="1-month">1 month</option>
                                <option value="2-3-months">2-3 months</option>
                                <option value="3-6-months">3-6 months</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none transition-all cursor-text"
                                style={{ borderColor: colors.neutral.gray[300] }}
                                onFocus={(e) => e.currentTarget.style.borderColor = colors.primary.main}
                                onBlur={(e) => e.currentTarget.style.borderColor = colors.neutral.gray[300]}
                                placeholder="Example: Oslo, Norway or Remote"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 cursor-pointer"
                                style={{ backgroundColor: colors.primary.main }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                                disabled={!tradeType}
                            >
                                {tradeType === "swap" ? "Create Skill Swap" : tradeType === "cash" ? "Post Ad" : "Select Trade Type"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}
