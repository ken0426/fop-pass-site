/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './privacy/*.html', './terms/*.html', './contact/*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0C',
        accent: '#E11D2E',
        /* 白抜き文字を載せる面。AA（4.5:1）を満たす深さにしてある。 */
        'accent-deep': '#C4132A',
        'accent-dark': '#B8121F',
        paper: '#FAFAFA',
        surface: '#FFFFFF',
        mist: '#F3F3F4',
        line: '#E6E6E8',
        muted: '#6B6B70',
      },
      fontFamily: {
        /* ラテンはInter、日本語はNoto Sans JPで受ける。 */
        sans: [
          'Inter', '"Noto Sans JP"', '"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"',
          '"Yu Gothic Medium"', 'system-ui', '-apple-system', 'sans-serif',
        ],
        /* 数字だけ運輸系サインの空気を持つコンデンスド。 */
        num: ['Oswald', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.32, 0.64, 1)',
      },
      maxWidth: { content: '1180px' },
      letterSpacing: { tightest: '-0.035em' },
    },
  },
  plugins: [],
};
