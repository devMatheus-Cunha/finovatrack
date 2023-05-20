/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  content: [
    './node_modules/flowbite/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#3E4C59',
        accent: '#6D28D9',
        danger: '#EF4444',
        success: '#22C55E',
        warning: '#F59E0B',
        info: '#3B82F6',
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
