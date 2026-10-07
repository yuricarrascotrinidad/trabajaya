/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:         '#0E2A47',
          'blue-deep':  '#09192D',
          green:        '#00B894',
          'green-mid':  '#00A383',
          'green-light':'#E8F8F1',
          'green-pale': '#F0FBF7',
          white:        '#FFFFFF',
          yellow:       '#FFC107',
          'yellow-pale':'#FFF8E1',
          sky:          '#4DA3FF',
          'sky-pale':   '#EBF4FF',
          purple:       '#7C3AED',
          'purple-pale':'#F3EEFF',
          red:          '#FF5B5B',
          'red-pale':   '#FFF0F0',
        },
        neutral: {
          dark:   '#1F2937',
          medium: '#6B7280',
          light:  '#E5E7EB',
          subtle: '#F9FAFB',
          bg:     '#F0F4F8',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        'xs':    '0 1px 3px rgba(14,42,71,0.06)',
        'soft':  '0 4px 20px -2px rgba(14,42,71,0.08), 0 2px 6px -1px rgba(14,42,71,0.04)',
        'card':  '0 12px 32px -4px rgba(14,42,71,0.12), 0 4px 10px -2px rgba(14,42,71,0.06)',
        'float': '0 20px 40px -8px rgba(14,42,71,0.18), 0 8px 16px -4px rgba(14,42,71,0.08)',
        'green': '0 6px 22px -2px rgba(0,184,148,0.40)',
        'btn':   '0 4px 14px rgba(0,184,148,0.35)',
        'inner-soft': 'inset 0 1px 3px rgba(14,42,71,0.06)',
        'phone': '0 32px 80px -12px rgba(14,42,71,0.28), 0 0 0 8px #FFFFFF, 0 0 0 10px #E5E7EB',
      },
      backgroundImage: {
        'gradient-main':  'linear-gradient(135deg, #00B894 0%, #0E2A47 100%)',
        'gradient-sky':   'linear-gradient(135deg, #4DA3FF 0%, #7C3AED 100%)',
        'gradient-warm':  'linear-gradient(135deg, #FFC107 0%, #FF5B5B 100%)',
        'gradient-green': 'linear-gradient(135deg, #00B894 0%, #00A383 100%)',
        'gradient-card':  'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
        'gradient-hero':  'linear-gradient(160deg, #E8F8F1 0%, #FFFFFF 50%, #EBF4FF 100%)',
      },
      keyframes: {
        'slide-up':   { '0%': { transform: 'translateY(12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'fade-in':    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'pop':        { '0%': { transform: 'scale(0.92)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'shimmer':    { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
        'bounce-sm':  { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        'glow':       { '0%,100%': { boxShadow: '0 0 8px rgba(0,184,148,0.3)' }, '50%': { boxShadow: '0 0 20px rgba(0,184,148,0.6)' } },
      },
      animation: {
        'slide-up':  'slide-up 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        'fade-in':   'fade-in 0.25s ease both',
        'pop':       'pop 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
        'shimmer':   'shimmer 1.6s linear infinite',
        'bounce-sm': 'bounce-sm 2s ease-in-out infinite',
        'glow':      'glow 2.5s ease-in-out infinite',
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
