import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#2C5F2D',
        'olive': '#97BC62',
        'sand': '#FDE5B4',
        'terracotta': '#E97451',
        'cream': '#FFFDD0',
      },
    },
  },
  plugins: [animate],
}

export default config