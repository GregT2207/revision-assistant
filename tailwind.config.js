/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    theme: {
        extend: {
            colors: {
                'light-100': '#F8FBFB',
                'light-200': '#F5F6F6',
                'light-300': '#EEEFEF',
                'gray-100': '#D7D8D9',
                'gray-200': '#BFC2C3',
                'gray-300': '#959A9C',
                'gray-400': '#6B7072',
                'gray-500': '#4F5355',
                'gray-600': '#36393B',
                'gray-700': '#171A1D',
                'blue-500': '#1F4AE5',
                'orange-500': '#FF4405',
                'green-500': '#00AC31',
                'orange-600': '#E26320',
            },
        },
    },
    plugins: [],
};
