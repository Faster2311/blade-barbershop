/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0d0e10',
          800: '#131416',
          700: '#1c1e22',
          600: '#252830',
          500: '#363a44',
        },
        bone: {
          DEFAULT: '#f1ede4',
          dim: '#c8c3b9',
        },
        brass: {
          DEFAULT: '#d1a347',
          light: '#e2b95e',
          dark: '#a17e30',
          deep: '#6f5720',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['"PT Sans"', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'widest-2': '0.35em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
