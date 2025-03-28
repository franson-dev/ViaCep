import * as React from 'react';
// Importa componentes do React e de bibliotecas relacionadas.
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ScrollView
} from 'react-native';
import { TextInput, List, Card } from 'react-native-paper';
// Importa componentes do React Native e do React Native Paper.

export default function App() {
  // Define os estados para armazenar os dados do usuário e os campos do formulário.
  const [cep, setCep] = React.useState('');
  const [rua, setRua] = React.useState('');
  const [bairro, setBairro] = React.useState('');
  const [cidade, setCidade] = React.useState('');
  const [estadoSelecionado, setEstadoSelecionado] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [user, setUser] = React.useState(null); // Armazena os dados completos do usuário.

  // Define uma classe para armazenar os resultados de busca e os dados do formulário.
  class Result {
    constructor(nome, email, cep, rua, bairro, cidade, estado) {
      this.nome = nome;
      this.email = email;
      this.cep = cep;
      this.rua = rua;
      this.bairro = bairro;
      this.cidade = cidade;
      this.estado = estado;
    }
  }

  // Lista de estados brasileiros com suas siglas e nomes.
  const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  // Função para limpar todos os campos e resetar os estados.
  function limpar() {
    setRua('');
    setBairro('');
    setCidade('');
    setCep('');
    setEstadoSelecionado('');
    setNome('');
    setEmail('');
    setUser(null);
  }

  // Função para buscar informações do CEP utilizando a API ViaCEP.
  const BuscarCep = (xcep) => {
    if (xcep.length !== 8) {
      alert('CEP inválido! Digite um CEP com 8 dígitos.');
      return;
    }

    // Constrói a URL de busca com o CEP fornecido.
    let Url = `https://viacep.com.br/ws/${xcep}/json/`;
    fetch(Url)
      .then((resp) => resp.json()) // Processa a resposta da API.
      .then((dados) => {
        if (dados.erro) {
          alert('CEP não encontrado.');
        } else {
          // Atualiza os estados com as informações obtidas da API.
          setRua(dados.logradouro);
          setCidade(dados.localidade);
          setBairro(dados.bairro);

          // Busca o estado correspondente à sigla.
          const estadoEncontrado = estados.find(extr => extr.sigla === dados.uf);
          if (estadoEncontrado) {
            setEstadoSelecionado(estadoEncontrado.nome);
          }

          // Armazena as informações completas no objeto 'user'.
          setUser(new Result(nome, email, xcep, dados.logradouro, dados.bairro, dados.localidade, estadoEncontrado?.nome));
        }
      })
      .catch(() => {
        alert('Erro ao buscar o CEP.');
      });
  };

  // Renderização do componente principal.
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Componente de cartão para agrupar o conteúdo */}
        <Card style={styles.card}>
          <Card.Title title="Cadastro de Endereço" />
          <Card.Content>

            {/* Campos de entrada para capturar informações do usuário */}
            <TextInput
              label="Nome"
              value={nome}
              onChangeText={setNome}
              keyboardType="default"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="CEP"
              value={cep}
              onChangeText={setCep}
              onBlur={() => BuscarCep(cep)} // Chama a função de busca ao sair do campo.
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Rua"
              value={rua}
              onChangeText={setRua}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Bairro"
              value={bairro}
              onChangeText={setBairro}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Cidade"
              value={cidade}
              onChangeText={setCidade}
              mode="outlined"
              style={styles.input}
            />

            {/* Menu de seleção para o estado */}
            <List.Accordion title={`Estado: ${estadoSelecionado || 'Selecionar'}`} style={styles.listAccordion}>
              {estados.map((estado) => (
                <List.Item
                  key={estado.sigla}
                  title={estado.nome}
                  onPress={() => setEstadoSelecionado(estado.nome)}
                />
              ))}
            </List.Accordion>

          </Card.Content>

          {/* Botões para limpar os campos ou buscar o CEP */}
          <View style={styles.buttonContainer}>
            <Button title="Limpar" onPress={limpar} color="#00796b" />
            <Button title="Buscar CEP" onPress={() => BuscarCep(cep)} color="#004d40" />
          </View>
        </Card>

        {/* Exibe os resultados apenas se os dados estiverem preenchidos */}
        {user && (
          <View style={styles.resultContainer}>
            <Text style={styles.textFocus}>Nome:<Text style={styles.text}> {user.nome}</Text></Text>
            <Text style={styles.textFocus}>E-mail:<Text style={styles.text}> {user.email}</Text></Text>
            <Text style={styles.textFocus}>CEP:<Text style={styles.text}> {user.cep}</Text></Text>
            <Text style={styles.textFocus}>Rua:<Text style={styles.text}> {user.rua}</Text></Text>
            <Text style={styles.textFocus}>Bairro:<Text style={styles.text}> {user.bairro}</Text></Text>
            <Text style={styles.textFocus}>Cidade:<Text style={styles.text}> {user.cidade}</Text></Text>
            <Text style={styles.textFocus}>Estado:<Text style={styles.text}> {user.estado}</Text></Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos para personalizar os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80cbc4',
    padding: 10,
  },
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: '#e0f2f1', 
    borderRadius: 8,
    elevation: 4,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#b2dfdb',
    color: '#004d40',
  },
  listAccordion: {
    backgroundColor: '#80cbc4',
    color: '#004d40',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  resultContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#e0f2f1',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#00796b', 
    borderBottomWidth: 3,
    borderBottomColor: '#00796b',
  },
  textFocus: {
    fontWeight: 'bold',
    color: '#004d40',
  },
  text: {
    fontWeight: 'normal',
    color: '#004d40',
  },
});
