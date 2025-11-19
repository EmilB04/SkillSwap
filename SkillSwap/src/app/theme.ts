/**
 * SkillSwap Theme Configuration
 * 
 * Centralized color palette and theme tokens for consistent styling across the application.
 */

export const colors = {
    // Primary Brand Colors
    primary: {
        main: '#438C86',      // Teal - Main brand color
        hover: '#3a7770',     // Darker teal for hover states
        light: '#5aa49e',     // Lighter teal
        dark: '#2f6660',      // Darkest teal
        active: '#2f6660',    // Active state
    },

    // Secondary Colors
    secondary: {
        sky: '#5aa49e',       // Light teal accent (matches primary.light)
        light: '#7BC4D4',     // Lighter teal
        pale: '#E8F5F4',      // Pale teal background
        accent: '#A1D6E2',    // Soft blue accent
    },

    // Support/Contact Colors
    support: {
        email: '#816bffff',     // Coral red for email
        phone: '#4ECDC4',     // Bright teal for phone
        chat: '#ff6d8dff',      // Bright yellow for chat
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
 * Spacing scale following Tailwind's convention
 */
export const spacing = {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px',   // Fully rounded
} as const;

/**
 * Transition durations
 */
export const transition = {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
} as const;

/**
 * Box shadow presets
 */
export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
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
