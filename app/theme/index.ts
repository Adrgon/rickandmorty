import { Theme } from '../types/theme';

export const darkTheme: Theme = {
  colors: {
    background: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#BDC3C7',
    primary: '#97CE4C', // Verde Rick
    secondary: '#44281D', // Marrón Morty
    accent: '#E4A788',
    success: '#2ECC71',
    error: '#E74C3C',
    warning: '#F1C40F',
    info: '#3498DB',
    surface: '#2A2A2A',
    card: '#2A2A2A',
  },
};

export const lightTheme: Theme = {
  colors: {
    background: '#F5F5F5',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    primary: '#97CE4C', // Verde Rick
    secondary: '#44281D', // Marrón Morty
    accent: '#E4A788',
    success: '#2ECC71',
    error: '#E74C3C',
    warning: '#F1C40F',
    info: '#3498DB',
    surface: '#FFFFFF',
    card: '#FFFFFF',
  },
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme; 
