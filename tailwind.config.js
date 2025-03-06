// tailwind.config.js
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          'theme-light': {
            background: '#f0f0f0',
            icon: '#6366f1', // Indigo
          },
          'theme-dark': {
            background: '#2d3748', // Gris oscuro
            icon: '#fbbf24', // Amarillo
          }
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(-10deg)' },
            '75%': { transform: 'rotate(10deg)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          pulse: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          }
        },
        animation: {
          'theme-wiggle': 'wiggle 0.3s ease-in-out',
          'theme-float': 'float 2s ease-in-out infinite',
          'theme-pulse': 'pulse 1s ease-in-out infinite',
        },
        boxShadow: {
          'theme-light': '0 4px 6px rgba(0,0,0,0.1)',
          'theme-dark': '0 4px 6px rgba(255,255,255,0.2)',
        },
        transition: {
          'theme': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }
      },
    },
    plugins: [],
  }