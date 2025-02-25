import { Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import { Text, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native-paper';
import { useState } from 'react';




export default function App() {
  // cep = ;
  let [cep, setCep] = useState(null);
  let [render, setRender] = useState([]);


  let BuscaCep = (xcep) => {
    let url = `https://viacep.com.br/ws/${xcep}/json/`;
    console.log(url);
    fetch(url)
      .then(
        (resp) => { return resp.json() }
      ).then(
        (dados) => {
          console.log(dados);

          console.log(dados.logradouro);
          console.log(dados["logradouro"]);
          setRender(dados);

        }
      ).catch(
        (erro) => { console.log(erro) }
      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Cep</Text>
      <TextInput
        onChangeText={(value) => { setCep(value) }}
        placeholder="Digite Cep"
      />
      <Button
        title="Buscar"
        onPress={() => { BuscaCep(cep) }}
      />

      <Text> Endereço : {render["logradouro"]}</Text>
      <Text> Bairro : {render["bairro"]}</Text>
      <Text> Cidade : {render.localidade}</Text>
      <Text> Estado : {render.estado}</Text>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    padding: 8,
    margin: 20
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
