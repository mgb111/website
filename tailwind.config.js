module.exports = {
  purge: [
    './*.html',
    './*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'teal': {
          '50': '#F0FDF4',
          '100': '#DCFCE7',
          '200': '#BBF7D0',
          '300': '#86EFAC',
          '400': '#4ADE80',
          '500': '#22C55E',
          '600': '#16A34A',
          '700': '#15803D',
          '800': '#166534',
          '900': '#14532D',
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
