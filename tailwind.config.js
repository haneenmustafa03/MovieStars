/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',        // Include the HTML file(s)
    './src/**/*.js',       // Include JavaScript files inside the src directory (if you use JS classes)
    './src/**/*.html',     // If you have any HTML files inside src (optional)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
