/**
 * SkillSwap Theme Configuration
 * 
 * Centralized color palette and theme tokens for consistent styling across the application.
 */

export const colors = {
    // Primary Brand Colors - Teal/mint from logo (softer, more readable)
    primary: {
        main: '#3FA69F',      // Softer teal - easier on eyes
        hover: '#368E88',     // Deeper for hover
        light: '#5FBBB4',     // Lighter mint tint
        dark: '#2E7A75',      // Deeper for contrast
        active: '#266965',    // Strong active state
    },

    // Secondary Colors - Navy and supporting tones from logo
    secondary: {
        navy: '#3D5268',      // Deep navy/slate from logo
        slate: '#556B7C',     // Mid-tone slate
        mint: '#5FE3D8',      // Bright mint accent
        pale: '#F0F9F8',      // Very pale teal background
        cream: '#FAFCFC',     // Near-white with cool hint
    },

    // Support/Contact Colors - Palette variants
    support: {
        email: '#4ECDC4',     // Primary teal
        phone: '#3D5268',     // Navy for trust
        chat: '#5FE3D8',      // Bright mint for immediacy
    },

    // Neutral Colors
    neutral: {
        white: '#ffffff',
        black: '#000000',
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },
    },

    // Semantic Colors
    semantic: {
        success: {
            bg: '#f0fdf4',      // Green background
            text: '#166534',    // Green text
            border: '#bbf7d0',  // Green border
        },
        error: {
            bg: '#fef2f2',      // Red background
            text: '#991b1b',    // Red text
            border: '#fecaca',  // Red border
        },
        warning: {
            bg: '#fffbeb',      // Yellow background
            text: '#92400e',    // Yellow text
            border: '#fde68a',  // Yellow border
        },
        info: {
            bg: '#eff6ff',      // Blue background
            text: '#1e40af',    // Blue text
            border: '#bfdbfe',  // Blue border
        },
    },
} as const;

/**
 * Opacity values for consistent transparency
 */
export const opacity = {
    backdrop: 0.8,
    overlay: 0.5,
    hover: 0.9,
    disabled: 0.5,
    subtle: 0.2,
} as const;

/**
 * Spacing scale - slightly off perfect increments for human feel
 */
export const spacing = {
    xs: '0.3rem',     // ~5px - slightly more than expected
    sm: '0.625rem',   // 10px - breaks the doubling pattern
    md: '1.125rem',   // 18px - not quite 16, feels natural
    lg: '1.75rem',    // 28px - between common values
    xl: '2.25rem',    // 36px - unique increment
    '2xl': '3.5rem',  // 56px - purposefully off
    '3xl': '4.75rem', // 76px - non-standard
} as const;

/**
 * Border radius values - softer, less mathematical
 */
export const borderRadius = {
    sm: '0.5rem',     // 8px - softer than typical 6px
    md: '0.625rem',   // 10px - between common values
    lg: '0.875rem',   // 14px - unique curve
    xl: '1.125rem',   // 18px - distinctive
    '2xl': '1.625rem',// 26px - non-standard but pleasant
    full: '9999px',   // Fully rounded
} as const;

/**
 * Transition durations - custom timing, not textbook values
 */
export const transition = {
    quick: '140ms',   // Slightly slower than typical "fast"
    normal: '280ms',  // Not the AI-standard 200ms
    smooth: '380ms',  // Luxurious, not rushed
    lazy: '520ms',    // Deliberately slow
} as const;

/**
 * Box shadow presets - softer, more natural
 */
export const shadows = {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.04)',
    soft: '0 3px 12px rgba(0, 0, 0, 0.07)',
    medium: '0 6px 20px rgba(0, 0, 0, 0.09)',
    lifted: '0 12px 32px rgba(0, 0, 0, 0.12)',
} as const;

// Export default theme object
export const theme = {
    colors,
    opacity,
    spacing,
    borderRadius,
    transition,
    shadows,
} as const;

export default theme;
