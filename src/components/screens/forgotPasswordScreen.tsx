import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    // Aqui, você pode implementar lógica de verificação se o email existe no sistema
    // ou fornecer uma dica para resetar a senha, caso haja backend para isso.
    Alert.alert("Acesso Recuperado", "Se esse e-mail estiver cadastrado, você receberá um e-mail de recuperação.");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ESQUECEU A SENHA?</Text>
      <Text>Digite seu e-mail para recuperar a senha</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Recuperar acesso" onPress={handlePasswordReset} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Voltar para o login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default ForgotPasswordScreen;
