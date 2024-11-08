import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

// Função para obter a conexão com o banco de dados
export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'LabControlDB', location: 'default' });
};

// Função para criar as tabelas, se ainda não existirem
export const createTables = async (db) => {
  // Criação da tabela Equipamentos
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS Equipamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      equipamento TEXT NOT NULL,
      capacidade_nominal TEXT,
      numero_serie TEXT,
      data_calibracao TEXT,
      numero_certificado TEXT,
      validade TEXT
    );
  `);

  // Criação da tabela Users
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      full_name TEXT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
};

// Função para adicionar um usuário na tabela Users
export const addUser = async (db, user) => {
  const { email, fullName, username, password } = user;
  await db.executeSql(
    `INSERT INTO Users (email, full_name, username, password) VALUES (?, ?, ?, ?);`,
    [email, fullName, username, password]
  );
};

// Função para adicionar um equipamento na tabela Equipamentos
export const addEquipamento = async (db, equipamento) => {
  const { equipamento: nome, capacidade_nominal, numero_serie, data_calibracao, numero_certificado, validade } = equipamento;
  await db.executeSql(
    `INSERT INTO Equipamentos (equipamento, capacidade_nominal, numero_serie, data_calibracao, numero_certificado, validade) VALUES (?, ?, ?, ?, ?, ?);`,
    [nome, capacidade_nominal, numero_serie, data_calibracao, numero_certificado, validade]
  );
};
