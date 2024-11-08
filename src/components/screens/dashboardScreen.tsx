import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { getDBConnection, getEquipamentos } from '../services/database';

const DashboardScreen = ({ navigation }) => {
  const [equipamentos, setEquipamentos] = useState([]);

  const loadEquipamentos = async () => {
    try {
      const db = await getDBConnection();
      const equipamentosList = await getEquipamentos(db);
      setEquipamentos(equipamentosList);
    } catch (error) {
      console.error("Erro ao carregar equipamentos:", error);
      Alert.alert("Erro", "Não foi possível carregar os equipamentos.");
    }
  };

  useEffect(() => {
    loadEquipamentos();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Cadastrar Equipamento" onPress={() => navigation.navigate('RegisterEquipment')} />
      <FlatList
        data={equipamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.equipamento}</Text>
            <Text>Validade: {item.validade}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DashboardScreen;
