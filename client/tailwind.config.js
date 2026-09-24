/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Direct Semantic Color Palette (Appetite-Inducing Warm Gourmet Burger)
        crimson: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
          light: '#FEE2E2',
        },
        mustard: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FEF3C7',
        },
        charcoal: {
          DEFAULT: '#18181B',
          muted: '#52525B',
          light: '#71717A',
        },
        alabaster: {
          DEFAULT: '#F8F6F2',
          card: '#FFFFFF',
          dark: '#EFECE6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E5E7EB',
          subtle: '#F4F2EC',
        },
        // Brand Namespace (Matches all brand.* utility classes)
        brand: {
          red: '#DC2626',
          redDark: '#B91C1C',
          redLight: '#FEE2E2',
          amber: '#F59E0B',
          amberDark: '#D97706',
          amberLight: '#FEF3C7',
          charcoal: '#18181B',
          slate: '#4B5563',
          bg: '#F8F6F2',
          card: '#FFFFFF',
          border: '#E5E7EB',
          borderDark: '#D1D5DB',
        },
      },
      fontFamily: {
        heading: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(24, 24, 27, 0.05)',
        'soft': '0 4px 20px -2px rgba(24, 24, 27, 0.06), 0 2px 6px -1px rgba(24, 24, 27, 0.03)',
        'soft-md': '0 10px 25px -3px rgba(24, 24, 27, 0.08), 0 4px 10px -2px rgba(24, 24, 27, 0.04)',
        'soft-lg': '0 20px 40px -4px rgba(24, 24, 27, 0.12), 0 8px 16px -4px rgba(24, 24, 27, 0.06)',
        'card': '0 4px 20px -2px rgba(24, 24, 27, 0.06), 0 2px 6px -1px rgba(24, 24, 27, 0.03)',
        'card-hover': '0 16px 36px -4px rgba(24, 24, 27, 0.12), 0 4px 12px -2px rgba(24, 24, 27, 0.06)',
        'red-glow': '0 8px 25px -4px rgba(220, 38, 38, 0.35)',
        'amber-glow': '0 8px 25px -4px rgba(245, 158, 11, 0.30)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        slideLeft: 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeIn: 'fadeIn 0.2s ease forwards',
      }
    },
  },
  plugins: [],
}
