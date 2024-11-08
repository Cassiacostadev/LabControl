// @/hooks/useColorScheme.ts
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

// Retorna o esquema de cor atual do sistema (light ou dark)
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() ?? 'light'; // Define um padrão 'light' para evitar 'undefined'
}
