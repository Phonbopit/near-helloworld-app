const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Varela Round', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-12deg)' },
          '50%': { transform: 'rotate(12deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 0.5s infinite'
      }
    }
  },
  plugins: []
};
