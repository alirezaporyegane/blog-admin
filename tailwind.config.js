import withMT from '@material-tailwind/react/utils/withMT'

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ['./index.html', './src/**/**/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Vazirmatn', 'sans-serif'],
      serif: ['Vazirmatn', 'serif'],
      body: ['Vazirmatn', 'sans-serif']
    },
    extend: {}
  },
  plugins: []
})
