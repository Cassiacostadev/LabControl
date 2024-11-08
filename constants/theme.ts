// @/constants/themes.ts
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

export const DarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#000000', // Cor de fundo para o tema escuro
    text: '#FFFFFF',       // Cor do texto para o tema escuro
  },
};

export const DefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#FFFFFF', // Cor de fundo para o tema claro
    text: '#000000',       // Cor do texto para o tema claro
  },
};
