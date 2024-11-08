import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { loginUser, registerUser, checkEmailExists, resetPassword } from '../services/authService';

// Definindo o tipo dos dados de autenticação
interface AuthContextData {
  isAuthenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, username: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

// Criando o contexto de autenticação
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider para o contexto de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  // Função para login
  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.user.email);
        await AsyncStorage.setItem('@user', result.user.email); // Armazena o email do usuário no AsyncStorage
      } else {
        setIsAuthenticated(false);
        Alert.alert('Erro', 'Credenciais inválidas');
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      Alert.alert('Erro', 'Não foi possível fazer o login.');
    }
  };

  // Função para logout
  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    await AsyncStorage.removeItem('@user'); // Remove o usuário do AsyncStorage
  };

  // Função para registro
  const register = async (email: string, username: string, password: string) => {
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        Alert.alert('Erro', 'E-mail já está cadastrado.');
        return;
      }

      await registerUser(email, username, password);
      Alert.alert('Registro bem-sucedido', `Bem-vindo, ${username}!`);
      await login(email, password); // Autentica o usuário automaticamente após o registro
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      Alert.alert('Erro', 'Não foi possível registrar o usuário.');
    }
  };

  // Função para recuperação de senha
  const forgotPassword = async (email: string) => {
    try {
      const result = await resetPassword(email);
      if (result.success) {
        Alert.alert('Sucesso', 'Instruções para recuperação de senha foram enviadas.');
      } else {
        Alert.alert('Erro', 'E-mail não encontrado.');
      }
    } catch (error) {
      console.error("Erro ao recuperar senha:", error);
      Alert.alert('Erro', 'Não foi possível processar a recuperação de senha.');
    }
  };

  // Função para carregar o estado de autenticação ao iniciar o app
  const loadUserFromStorage = async () => {
    const storedUser = await AsyncStorage.getItem('@user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};
