import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { getDBConnection, createTables, addEquipamento } from '../services/database';

const RegisterEquipmentScreen = () => {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [dataCalibracao, setDataCalibracao] = useState('');
  const [numeroCertificado, setNumeroCertificado] = useState('');
  const [validade, setValidade] = useState('');

  const handleRegister = async () => {
    try {
      const db = await getDBConnection();
      await createTables(db);
      await addEquipamento(db, {
        equipamento: nome,
        capacidade_nominal: capacidade,
        numero_serie: numeroSerie,
        data_calibracao: dataCalibracao,
        numero_certificado: numeroCertificado,
        validade,
      });
      Alert.alert("Sucesso", "Equipamento cadastrado com sucesso!");
      // Limpar os campos após o cadastro
      setNome('');
      setCapacidade('');
      setNumeroSerie('');
      setDataCalibracao('');
      setNumeroCertificado('');
      setValidade('');
    } catch (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      Alert.alert("Erro", "Não foi possível cadastrar o equipamento.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput placeholder="Equipamento" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Capacidade Nominal" value={capacidade} onChangeText={setCapacidade} style={styles.input} />
      <TextInput placeholder="Nº de Série" value={numeroSerie} onChangeText={setNumeroSerie} style={styles.input} />
      <TextInput placeholder="Data de Calibração" value={dataCalibracao} onChangeText={setDataCalibracao} style={styles.input} />
      <TextInput placeholder="Número do Certificado" value={numeroCertificado} onChangeText={setNumeroCertificado} style={styles.input} />
      <TextInput placeholder="Validade" value={validade} onChangeText={setValidade} style={styles.input} />
      <Button title="Cadastrar" onPress={handleRegister} />
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

export default RegisterEquipmentScreen;
