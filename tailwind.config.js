/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './privacy/*.html', './terms/*.html', './contact/*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        /* 航空会社のサイトに倣い、白地・黒文字・赤は差し色だけに使う。 */
        ink: '#14161A',
        sub: '#57575C',
        line: '#DCDCDE',
        'line-strong': '#B4B4B8',
        mist: '#F4F4F5',
        accent: '#C8102E',
        'accent-hover': '#A50D26',
      },
      fontFamily: {
        sans: [
          'Inter', '"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', '"Hiragino Sans"',
          '"Yu Gothic Medium"', 'system-ui', '-apple-system', 'sans-serif',
        ],
        num: ['Oswald', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1120px', prose: '46rem' },
      borderRadius: { DEFAULT: '2px', card: '3px' },
      fontSize: {
        /* 情報量を落とさないよう、本文は小さめ・行間広めに揃える。 */
        body: ['15px', { lineHeight: '1.95' }],
        small: ['13px', { lineHeight: '1.85' }],
        label: ['12px', { lineHeight: '1.6', letterSpacing: '0.04em' }],
      },
    },
  },
  plugins: [],
};
