// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream-bg': '#F8F4E8',
      },
      animation: {
        'auto-rotate': 'auto-rotate 40s linear infinite', // 40초에 한 바퀴
      },
      keyframes: {
        'auto-rotate': {
          'from': { transform: 'rotateX(var(--rotateX)) rotateY(calc(var(--rotateY) + 0deg))' },
          'to': { transform: 'rotateX(var(--rotateX)) rotateY(calc(var(--rotateY) + 360deg))' },
        },
      }
    },
  },
  plugins: [],
}

export default config