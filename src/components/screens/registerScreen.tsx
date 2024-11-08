import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { getDBConnection, createTables, addUser } from '../services/database';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const db = await getDBConnection();
      await createTables(db);
      await addUser(db, { email, fullName, username, password });
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      Alert.alert("Erro", "Não foi possível criar a conta.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRIA UMA NOVA CONTA</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <TextInput placeholder="Repeat Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />
      <Button title="Criar conta" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;
