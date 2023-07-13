/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
export const theme = {
  screens: {
    sm: '375px',
    md: '700px',
    lg: '1000px',
    xl: '1440px'
  },
  colors: {
    'strong-cyan': 'hsl(172, 67%, 45%)',
    'very-dark-cyan': 'hsl(183, 100%, 15%)',
    'dark-grayish-cyan': 'hsl(186, 14%, 43%)',
    'grayish-cyan': 'hsl(184, 14%, 56%)',
    'light-grayish-cyan': 'hsl(185, 41%, 84%)',
    'very-light-grayish-cyan': 'hsl(189, 41%, 97%)',
    'light-cyan': '#9fe8df',
    'white-primary': 'hsl(0, 0%, 100%)'
  },
  fontFamily: {
    spaceMono: ['Space Mono', 'sans-serif']
  },
  extend: {}
}
export const plugins = []
