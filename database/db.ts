import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina a chave para o armazenamento
const CERTIFICATES_KEY = 'certificates';

// Defina a interface para o certificado
interface Certificate {
  id?: string; // O ID pode ser gerado automaticamente, então é opcional
  vidraria: string;
  capacidade_nominal: string;
  identificacao: string;
  data_calibracao: string;
  numero_certificado: string;
  validade_calibracao: string;
}

// Função para salvar um novo certificado
export const saveCertificate = async (certificate: Certificate) => {
  try {
    // Pega a lista atual de certificados
    const certificates = await getCertificates();

    // Adiciona o novo certificado com um ID único
    certificates.push({
      id: Date.now().toString(),
      ...certificate
    });

    // Armazena a lista atualizada
    await AsyncStorage.setItem(CERTIFICATES_KEY, JSON.stringify(certificates));
    console.log('Certificado salvo com sucesso');
  } catch (error) {
    console.error('Erro ao salvar certificado:', error);
  }
};

// Função para obter todos os certificados
export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const data = await AsyncStorage.getItem(CERTIFICATES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao recuperar certificados:', error);
    return [];
  }
};

// Função para deletar um certificado pelo ID
export const deleteCertificate = async (id: string) => {
  try {
    const certificates = await getCertificates();
    const updatedCertificates = certificates.filter(cert => cert.id !== id);
    await AsyncStorage.setItem(CERTIFICATES_KEY, JSON.stringify(updatedCertificates));
    console.log('Certificado deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar certificado:', error);
  }
};
