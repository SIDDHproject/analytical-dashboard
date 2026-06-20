/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // supports class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'neon-cyber': '0 0 15px rgba(236, 72, 153, 0.15), 0 0 30px rgba(6, 182, 212, 0.15)',
        'neon-forest': '0 0 15px rgba(16, 185, 129, 0.15), 0 0 30px rgba(234, 179, 8, 0.15)',
        'neon-solar': '0 0 15px rgba(249, 115, 22, 0.15), 0 0 30px rgba(234, 179, 8, 0.15)',
        'neon-frost': '0 0 15px rgba(59, 130, 246, 0.15), 0 0 30px rgba(147, 197, 253, 0.15)',
      }
    },
  },
  plugins: [],
}
