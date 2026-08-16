/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './privacy/*.html', './terms/*.html', './contact/*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        accent: '#E11D2E',
        'accent-dark': '#B8121F',
        paper: '#FFFFFF',
        mist: '#F6F6F7',
        line: '#E6E6E8',
        muted: '#6B6B70',
      },
      fontFamily: {
        sans: [
          '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic Medium"',
          '"Noto Sans JP"', 'system-ui', '-apple-system', 'sans-serif',
        ],
      },
      maxWidth: { content: '1180px' },
      letterSpacing: { tightest: '-0.035em' },
    },
  },
  plugins: [],
};
