/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        'ot-blue': '#2563eb',
        'ot-green': '#10b981',
        'ot-orange': '#f59e0b',
      },
    },
  },
  plugins: [],
}
