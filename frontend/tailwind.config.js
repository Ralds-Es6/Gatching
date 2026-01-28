/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "primary-hover": "#4f46e5",
        "bg-dark": "#0f172a",
        "bg-card": "#1e293b",
        "text-main": "#f8fafc",
        "text-muted": "#94a3b8",
        accent: "#22d3ee",
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
      },
      boxShadow: {
        'button': '0 4px 6px -1px rgba(99, 102, 241, 0.2)',
        'button-hover': '0 10px 15px -3px rgba(99, 102, 241, 0.3)',
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeInDown: 'fadeInDown 0.8s ease-out',
      }
    },
  },
  plugins: [],
}
