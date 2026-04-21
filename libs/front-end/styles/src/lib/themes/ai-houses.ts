import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

export const AiHousesTheme = definePreset(Aura, {
  primitive: {
    aiRed: {
      50: 'oklch(97.1% 0.013 17.38)',
      100: 'oklch(93.6% 0.032 17.717)',
      200: 'oklch(88.5% 0.062 18.334)',
      300: 'oklch(80.8% 0.114 19.571)',
      400: 'oklch(70.4% 0.191 22.216)',
      500: 'oklch(63.7% 0.237 25.331)',
      600: 'oklch(57.7% 0.245 27.325)',
      700: 'oklch(50.5% 0.213 27.518)',
      800: 'oklch(44.4% 0.177 26.899)',
      900: 'oklch(39.6% 0.141 25.723)',
      950: 'oklch(25.8% 0.092 26.042)'
    }
  },
  semantic: {
    primary: {
      50: '{aiRed.50}',
      100: '{aiRed.100}',
      200: '{aiRed.200}',
      300: '{aiRed.300}',
      400: '{aiRed.400}',
      500: '{aiRed.500}',
      600: '{aiRed.600}',
      700: '{aiRed.700}',
      800: '{aiRed.800}',
      900: '{aiRed.900}',
      950: '{aiRed.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{aiRed.600}',
          inverseColor: '#ffffff',
          hoverColor: '{aiRed.700}',
          activeColor: '{aiRed.700}',
          50: '{aiRed.50}',
          100: '{aiRed.100}',
          200: '{aiRed.200}',
          300: '{aiRed.300}',
          400: '{aiRed.400}',
          500: '{aiRed.500}',
          600: '{aiRed.600}',
          700: '{aiRed.700}',
          800: '{aiRed.800}',
          900: '{aiRed.900}',
          950: '{aiRed.950}'
        },
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        },
        highlight: {
          background: '{aiRed.600}',
          focusBackground: '{aiRed.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{aiRed.50}',
          inverseColor: '{aiRed.950}',
          hoverColor: '{aiRed.100}',
          activeColor: '{aiRed.200}'
        },
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
});

