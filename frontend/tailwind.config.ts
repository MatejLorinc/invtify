import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/(components)/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'text': {
                    50: '#07120c',
                    100: '#0e2519',
                    200: '#1c4a31',
                    300: '#2a6f4a',
                    400: '#389463',
                    500: '#46b97c',
                    600: '#6bc796',
                    700: '#90d5b0',
                    800: '#b5e3ca',
                    900: '#daf1e5',
                    950: '#edf8f2',
                },
                'background': {
                    50: '#06140d',
                    100: '#0c271b',
                    200: '#184e36',
                    300: '#247551',
                    400: '#309c6b',
                    500: '#3cc386',
                    600: '#63cf9e',
                    700: '#8adbb7',
                    800: '#b1e7cf',
                    900: '#d8f3e7',
                    950: '#ebf9f3',
                    'default': '#f2fbf7'
                },
                'primary': {
                    50: '#001a0c',
                    100: '#003319',
                    200: '#006631',
                    300: '#00994a',
                    400: '#00cc63',
                    500: '#00ff7b',
                    600: '#33ff96',
                    700: '#66ffb0',
                    800: '#99ffca',
                    900: '#ccffe5',
                    950: '#e5fff2',
                },
                'secondary': {
                    50: '#03160c',
                    100: '#072c19',
                    200: '#0d5932',
                    300: '#14854b',
                    400: '#1bb163',
                    500: '#21de7c',
                    600: '#4ee496',
                    700: '#7aebb1',
                    800: '#a6f2cb',
                    900: '#d3f8e5',
                    950: '#e9fcf2',
                },
                'accent': {
                    50: '#02170c',
                    100: '#042f19',
                    200: '#085e32',
                    300: '#0c8d4a',
                    400: '#10bc63',
                    500: '#14eb7c',
                    600: '#43ef96',
                    700: '#72f3b0',
                    800: '#a1f7cb',
                    900: '#d0fbe5',
                    950: '#e8fdf2',
                },
            },
            fontFamily: {
                heading: 'Inter',
                body: 'Inter',
            },
            fontWeight: {
                normal: '400',
                bold: '700',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-primary-accent": "linear-gradient(120deg, #00cc63, #55f0a0)"
            },
        },
    },
    plugins: [],
};
export default config;
