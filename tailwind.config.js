/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Pastel Dark Theme
                dark: {
                    900: '#0a0a0f',
                    800: '#12121a',
                    700: '#1a1a24',
                    600: '#22222e',
                    500: '#2a2a38',
                },
                // Accent Colors
                pastel: {
                    purple: '#a78bfa',
                    'purple-light': '#c4b5fd',
                    'purple-dark': '#7c3aed',
                    cyan: '#67e8f9',
                    'cyan-light': '#a5f3fc',
                    'cyan-dark': '#22d3ee',
                    pink: '#f9a8d4',
                    'pink-light': '#fbcfe8',
                    peach: '#fcd9bd',
                    'peach-light': '#fed7aa',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'breathe': 'breathe 4s ease-in-out infinite',
                'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'magnetic': 'magnetic 0.3s ease-out',
            },
            keyframes: {
                breathe: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(167, 139, 250, 0.6)' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-pastel': 'linear-gradient(135deg, #a78bfa 0%, #67e8f9 50%, #f9a8d4 100%)',
                'gradient-pastel-subtle': 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(103, 232, 249, 0.1) 50%, rgba(249, 168, 212, 0.1) 100%)',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow-sm': '0 0 15px rgba(167, 139, 250, 0.3)',
                'glow-md': '0 0 30px rgba(167, 139, 250, 0.4)',
                'glow-lg': '0 0 50px rgba(167, 139, 250, 0.5)',
                'glow-cyan': '0 0 30px rgba(103, 232, 249, 0.4)',
                'glow-pink': '0 0 30px rgba(249, 168, 212, 0.4)',
                'inner-glow': 'inset 0 0 20px rgba(167, 139, 250, 0.1)',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
