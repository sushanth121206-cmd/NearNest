import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
            },
            screens: {
                '2xl': '1280px',
            },
        },
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            colors: {
                /* ── Signature brand ───────────────────────────────── */
                brand: {
                    DEFAULT: '#0DCEA1',
                    50: '#E6FBF5',
                    100: '#C4F5E8',
                    200: '#96EBD6',
                    300: '#5FDEBF',
                    400: '#2FD8AF',
                    500: '#0DCEA1',
                    600: '#08A984',
                    700: '#0A8268',
                    800: '#0B6553',
                    900: '#0A5245',
                },
                mint: {
                    DEFAULT: '#A0D0C9',
                    soft: '#C8E3DE',
                    deep: '#5C8586',
                },
                /* ── Surface A: Light storefront ───────────────────── */
                surface: {
                    DEFAULT: '#FDFDFD',
                    soft: '#F8FCFC',
                    card: '#FFFFFF',
                },
                /* ── Surface B: Dark operator ──────────────────────── */
                navy: {
                    900: '#011628',
                    800: '#01263E',
                    700: '#0B2639',
                    600: '#12384F',
                    500: '#1B4763',
                },
                /* ── Neutrals & status ────────────────────────────── */
                ink: {
                    DEFAULT: '#011628',
                    body: '#464F5B',
                    muted: '#5C8586',
                    faint: '#8A98A6',
                },
                coral: {
                    DEFAULT: '#FF5A5F',
                    soft: '#FFEBEB',
                    deep: '#D93F44',
                },
                status: {
                    pending: '#F5A623',
                    processing: '#4A90D9',
                    delivered: '#0DCEA1',
                    cancelled: '#FF5A5F',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'Poppins', 'Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            boxShadow: {
                soft: '0 2px 16px -4px rgba(1, 22, 40, 0.08)',
                card: '0 8px 30px -12px rgba(1, 22, 40, 0.18)',
                glow: '0 0 0 1px rgba(13, 206, 161, 0.35), 0 12px 40px -12px rgba(13, 206, 161, 0.45)',
                'glow-sm': '0 0 0 1px rgba(13, 206, 161, 0.25), 0 6px 20px -10px rgba(13, 206, 161, 0.4)',
                'operator': '0 18px 50px -20px rgba(1, 22, 40, 0.55)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'fade-up': {
                    from: { opacity: '0', transform: 'translateY(12px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    from: { opacity: '0', transform: 'scale(0.9)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                'draw-check': {
                    to: { strokeDashoffset: '0' },
                },
                'pulse-ring': {
                    '0%': { boxShadow: '0 0 0 0 rgba(13,206,161,0.55)' },
                    '70%': { boxShadow: '0 0 0 14px rgba(13,206,161,0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(13,206,161,0)' },
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-6px)' },
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(100%)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-up': 'fade-up 0.4s ease-out both',
                'scale-in': 'scale-in 0.25s ease-out both',
                'draw-check': 'draw-check 0.6s ease-out 0.2s both',
                'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                shimmer: 'shimmer 1.6s infinite',
                float: 'float 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.28s ease-out both',
            },
        },
    },
    plugins: [tailwindcssAnimate],
};

export default config;
