import iconify from '@iconify/tailwind';
import flyonui from 'flyonui';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{vue,js,ts}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Urbanist', 'sans-serif'],
            },
            colors: {
                primary: '#1DA1F2',
                secondary: '#14171A',
                accent: '#657786',
                background: '#F5F8FA',
                text: '#14171A',
            },
        },
    },
    plugins: [flyonui, iconify],
};

export default config;
