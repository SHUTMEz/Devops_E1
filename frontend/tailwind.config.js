// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./components/**/*.{vue,js,ts}",
//     "./layouts/**/*.vue",
//     "./pages/**/*.vue",
//     "./plugins/**/*.{js,ts}",
//     "./app.vue"
//   ],
//   theme: { extend: {} },
//   plugins: []
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: { 
    extend: {
      colors: {
        'kawaii-pink': '#FF9EB5',
        'kawaii-lavender': '#A78BFA',
        'kawaii-blue': '#60A5FA',
        'kawaii-mint': '#34D399',
        'kawaii-yellow': '#FBBF24',
        'kawaii-cream': '#F8FAFC',
        'kawaii-charcoal': '#1E293B',
        'kawaii-sky': '#E0F2FE',
        'kawaii-lavender-light': '#EDE9FE',
        'kawaii-pink-light': '#FFE4E8',
      },
      fontFamily: {
        'kawaii': ['Nunito', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'kawaii': '20px',
        'kawaii-lg': '24px',
        'kawaii-xl': '32px',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'pulse-gentle': 'pulse-gentle 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-2deg)' }
        }
      },
      boxShadow: {
        'kawaii': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'kawaii-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'kawaii-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'clouds': "url(\"data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='10' cy='10' r='10' fill='%23FF9EB5' fill-opacity='0.1'/%3E%3Ccircle cx='30' cy='15' r='12' fill='%23A78BFA' fill-opacity='0.1'/%3E%3Ccircle cx='50' cy='10' r='8' fill='%2360A5FA' fill-opacity='0.1'/%3E%3Ccircle cx='20' cy='30' r='6' fill='%2334D399' fill-opacity='0.1'/%3E%3Ccircle cx='40' cy='30' r='10' fill='%23FBBF24' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E\")",
        'stars': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpolygon points='20 1 23.8196601 14.1803399 38 14.1803399 26.1803399 22.5 30 36 20 27.6393202 10 36 13.8196601 22.5 2 14.1803399 16.1803399 14.1803399' fill='%23FF9EB5' fill-opacity='0.05'/%3E%3Cpolygon points='10 1 13.8196601 14.1803399 28 14.1803399 16.1803399 22.5 20 36 10 27.6393202 0 36 3.8196601 22.5 -8 14.1803399 6.1803399 14.1803399' fill='%23A78BFA' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'kawaii': {
          'primary': '#FF9EB5',
          'primary-focus': '#FF7A9B',
          'primary-content': '#ffffff',
          'secondary': '#A78BFA',
          'secondary-focus': '#8B5CF6',
          'secondary-content': '#ffffff',
          'accent': '#60A5FA',
          'accent-focus': '#3B82F6',
          'accent-content': '#ffffff',
          'neutral': '#F8FAFC',
          'neutral-focus': '#E2E8F0',
          'neutral-content': '#1E293B',
          'base-100': '#ffffff',
          'base-200': '#F8FAFC',
          'base-300': '#E2E8F0',
          'base-content': '#1E293B',
          'info': '#60A5FA',
          'success': '#34D399',
          'warning': '#FBBF24',
          'error': '#F87171',
        },
      },
      'light',
      'dark',
      'corporate'
    ],
    darkTheme: 'dark',
  },
}
