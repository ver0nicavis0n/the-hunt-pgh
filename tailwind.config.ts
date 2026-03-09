import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#141412',
        'ink-light': '#6B6860',
        'ink-faint': '#B8B4AD',
        cream: '#F4F2EE',
        paper: '#EDE9E2',
        'off-white': '#FAFAF8',
        blue: {
          DEFAULT: '#0047FF',
          deep: '#0028A0',
          mid: '#0047FF',
          soft: '#5C8AFF',
          pale: '#A8C0FF',
          light: '#E5EDFF',
        },
        border: '#E2DDD6',
        'border-strong': '#C8C3BA',
      },
      fontFamily: {
        archivo: ['"Archivo Black"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.1em',
        wider: '0.18em',
        widest: '0.25em',
      },
    },
  },
  plugins: [],
}

export default config
