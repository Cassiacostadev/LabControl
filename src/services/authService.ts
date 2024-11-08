import { getDBConnection } from './database';
import { Alert } from 'react-native';
import bcrypt from 'bcryptjs';

// Função para registrar um novo usuário
export const registerUser = async (email: string, username: string, password: string) => {
  const db = await getDBConnection();
  
  // Criptografando a senha antes de armazenar
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await db.executeSql(
      `INSERT INTO Users (email, username, password) VALUES (?, ?, ?);`,
      [email, username, hashedPassword]
    );
    Alert.alert("Sucesso", "Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    Alert.alert("Erro", "Não foi possível registrar o usuário.");
  }
};

// Função para autenticar o usuário (login)
export const loginUser = async (email: string, password: string) => {
  const db = await getDBConnection();
  
  try {
    const results = await db.executeSql(
      `SELECT * FROM Users WHERE email = ?;`,
      [email]
    );

    if (results[0].rows.length > 0) {
      const user = results[0].rows.item(0);
      
      // Verificação da senha com bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return { success: true, user: { email: user.email, username: user.username } };
      } else {
        Alert.alert("Erro", "Senha incorreta.");
        return { success: false };
      }
    } else {
      Alert.alert("Erro", "Usuário não encontrado.");
      return { success: false };
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    Alert.alert("Erro", "Não foi possível autenticar o usuário.");
    return { success: false };
  }
};

// Função para verificar se o e-mail já está cadastrado (para validação durante o registro)
export const checkEmailExists = async (email: string) => {
  const db = await getDBConnection();
  
  try {
    const results = await db.executeSql(
      `SELECT * FROM Users WHERE email = ?;`,
      [email]
    );
    return results[0].rows.length > 0;
  } catch (error) {
    console.error("Erro ao verificar e-mail:", error);
    return false;
  }
};

// Função para recuperar a senha (simulação)
export const resetPassword = async (email: string) => {
  const db = await getDBConnection();
  
  try {
    const results = await db.executeSql(
      `SELECT * FROM Users WHERE email = ?;`,
      [email]
    );
    
    if (results[0].rows.length > 0) {
      // Aqui você poderia enviar um e-mail com uma nova senha ou com instruções para redefinição.
      Alert.alert("Sucesso", "Instruções para recuperação de senha foram enviadas.");
      return { success: true };
    } else {
      Alert.alert("Erro", "E-mail não encontrado.");
      return { success: false };
    }
  } catch (error) {
    console.error("Erro ao tentar recuperar senha:", error);
    Alert.alert("Erro", "Não foi possível processar a recuperação de senha.");
    return { success: false };
  }
};
