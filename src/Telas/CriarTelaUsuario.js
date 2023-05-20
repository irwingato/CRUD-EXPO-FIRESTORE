import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

import firebase from '../banco_de_dados/firebase';

function CriarTelaUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const salvarNovoUsuario = async () => {
    try {
      await firebase.firestore().collection('usuarios').add({
        nome,
        email,
        telefone
      });
      props.navigation.navigate('ListaTelaUsuario');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
      </View>
      <Button title="Salvar" onPress={salvarNovoUsuario} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  inputGroup: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  }
});

export default CriarTelaUsuario;