/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx,vue}',
    './formkit.config.js',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'vtd-primary': colors.green
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

