import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
                extend: {
                    fontFamily: {
                        display: ['Cabinet Grotesk', 'sans-serif'],
                        sans: ['Satoshi', 'sans-serif'],
                    },
                    colors: {
                        gray: {
                            50: '#FAFAFA',
                            100: '#F5F5F5',
                            200: '#E5E5E5',
                            300: '#D4D4D4',
                            400: '#A3A3A3',
                            500: '#737373',
                            600: '#525252',
                            700: '#404040',
                            800: '#262626',
                            900: '#171717',
                            950: '#0A0A0A',
                        },
                        brand: {
                            primary: '#3B82F6',   // Blue
                            accent: '#8B5CF6',    // Purple
                            cyan: '#06B6D4',      // Cyan
                            dark: '#050505',
                            surface: '#121212',
                            border: 'rgba(255, 255, 255, 0.08)'
                        }
                    },
                    backgroundImage: {
                        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                        'brand-gradient': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        'glow-mesh': 'radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.15), transparent 25%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15), transparent 25%)',
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        }
                    }
                }
            },
  plugins: [],
};
export default config;
