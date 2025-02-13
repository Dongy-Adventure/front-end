import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['bg-green-500', 'bg-red-500'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        project: {
          blue: '#001F54',
          green: '#37AF3F',
          primary: '#7A3FF3',
          secondary: '#F1E7FF',
          dark: '#634C9F',
          pink: '#FB2E86'
        },
      },
      fontFamily: {
        athiti: ['var(--athiti)', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config;
