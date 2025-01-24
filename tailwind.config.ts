import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        project: {
          blue: '#001F54',
        },
      },
      fontFamily: {
        athiti: ['var(--athiti)', 'system-ui'],
      },
    },
  },
  plugins: [],
} satisfies Config;
