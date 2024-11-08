import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#000000',       // Preto - cor principal para textos e botões importantes
  secondary: '#333333',     // Cinza escuro - para detalhes e elementos de destaque secundário
  background: '#FFFFFF',    // Branco - cor de fundo para as telas
  lightGray: '#D3D3D3',     // Cinza claro - para bordas e campos de input
  textPrimary: '#000000',   // Preto - cor principal do texto
  textSecondary: '#333333', // Cinza escuro - cor secundária do texto
  error: '#FF0000',         // Vermelho para mensagens de erro (mantido para feedback visual)
};

export const fonts = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: colors.secondary,
    textAlign: 'center',
    marginVertical: 8,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
});
