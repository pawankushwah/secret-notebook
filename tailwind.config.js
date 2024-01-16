/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            animation: {
                'bounce2': 'bounce2 3s ease-in-out infinite'
            },
            keyframes: {
                bounce2: {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-15px)' },
                    '60%': { transform: 'translateY(-10px)' }
                }
            }
        },
    },
    plugins: [],
}

