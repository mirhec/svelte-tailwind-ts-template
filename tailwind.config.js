const colors = require('tailwindcss/colors')
const production = !process.env.ROLLUP_WATCH;

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [

  ],
  purge: {
    content: [
     "./src/**/*.svelte",

    ],
    enabled: production // disable purge in dev
  },
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },
  },
};