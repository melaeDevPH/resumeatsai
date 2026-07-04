/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          900: "#0F172A",
          700: "#334155",
          500: "#64748B",
          300: "#CBD5E1",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F8FAFC",
          card: "#FFFFFF",
        },
        brand: {
          50: "#EEF4FF",
          100: "#E0EAFF",
          400: "#5B8DEF",
          500: "#2563EB",
          600: "#4338CA",
          700: "#3730A3",
        },
        sky: {
          400: "#38BDF8",
          500: "#0EA5E9",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #2563EB 55%, #0EA5E9 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, #EEF4FF 0%, #E0F2FE 100%)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -12px rgba(37, 99, 235, 0.18)",
        glow: "0 0 0 1px rgba(37,99,235,0.08), 0 20px 60px -20px rgba(79,70,229,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "type-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "paper-feed": {
          "0%": { transform: "translateY(6%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        "type-line": "type-line 1.4s steps(24, end) forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "paper-feed": "paper-feed 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
