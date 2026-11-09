/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060B11',
          900: '#0B121C',
          850: '#0F1A26',
          800: '#142233',
          750: '#1A2C42',
          700: '#233852',
          600: '#334D6E',
        },
        python: {
          yellow: '#FFD43B',
          yellowLight: '#FFE873',
          yellowDark: '#E6BC00',
          blue: '#387EB8',
          blueLight: '#4B8BBE',
          blueDark: '#2B5B84',
          cyan: '#38BDF8',
          green: '#10B981',
          greenLight: '#34D399',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Malayalam', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 25px -5px rgba(255, 212, 59, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(56, 126, 184, 0.35)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

