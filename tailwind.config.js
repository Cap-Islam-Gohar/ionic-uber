/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "index.html",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@ionic/react/**/*.js,ts,jsx,tsx", // Include Ionic components
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

