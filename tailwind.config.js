module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ioprimary: {
          default: 'var(--ion-color-primary)',
          shade: 'var(--ion-color-primary-shade)',
          tint: 'var(--ion-color-primary-tint)',
        },
        iosecondary: {
          default: 'var(--ion-color-secondary)',
          shade: 'var(--ion-color-secondary-shade)',
          tint: 'var(--ion-color-secondary-tint)',
        },
        iotertiary: {
          default: 'var(--ion-color-tertiary)',
          shade: 'var(--ion-color-tertiary-shade)',
          tint: 'var(--ion-color-tertiary-tint)',
        },
        iolight: {
          default: 'var(--ion-color-light)',
          shade: 'var(--ion-color-light-shade)',
          tint: 'var(--ion-color-light-tint)',
        },
        iomedium: {
          default: 'var(--ion-color-medium)',
          shade: 'var(--ion-color-medium-shade)',
          tint: 'var(--ion-color-medium-tint)',
        },
        iodark: {
          default: 'var(--ion-color-dark)',
          shade: 'var(--ion-color-dark-shade)',
          tint: 'var(--ion-color-dark-tint)',
        },
        iosuccess: {
          default: 'var(--ion-color-success)',
          shade: 'var(--ion-color-success-shade)',
          tint: 'var(--ion-color-success-tint)',
        },
        iowarning: {
          default: 'var(--ion-color-warning)',
          shade: 'var(--ion-color-warning-shade)',
          tint: 'var(--ion-color-warning-tint)',
        },
        iodanger: {
          default: 'var(--ion-color-danger)',
          shade: 'var(--ion-color-danger-shade)',
          tint: 'var(--ion-color-danger-tint)',
        },
        primary: {
          100: '#2445cd',
          90: '#4263eb',
          80: '#6680ee',
          60: '#8a9df0',
          40: '#acbbf3',
          20: '#d0d8f5',
          10: '#e3e7f7',
          5: '#f5f7fe',
        },
        secondary: {
          100: '#543af8',
          90: '#6c56f9',
          80: '#7e6bfa',
          60: '#907ffa',
          40: '#b2a6fc',
          20: '#d0c9fd',
          10: '#e1ddfe',
          5: '#f0eefe',
        },
        black: {
          100: '#15141f',
          90: '#211f32',
          80: '#52525c',
          60: '#a2a0a8',
          40: '#cccacf',
          20: '#dcdbe0',
          10: '#e8e8e8',
          5: '#f9f9fa',
        },
        white: '#ffffff',
        grey: '#323045',
        warning: {
          default: '#f6a609',
          dark: '#e89806',
          light: '#ffbc1f',
        },
        success: { default: '#2ac769', dark: '#1ab759', light: '#40dd7f' },
        error: { default: '#fb4e4e', dark: '#e93c3c', light: '#ff6262' },
      },
      boxShadow: { 'Shadow-Menu': '0px 12px 40px 0px rgba(35,120,250,0.1)' },
    },
    fontFamily: {
      montserrat: 'Montserrat, sans-serif',
    },
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
