import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet } from 'react-native';

import firebase from '../banco_de_dados/firebase';

function DetalheTelaUsuario(props) {
  const { usuarioId } = props.route.params;
  const [usuario, setUsuario] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState(false);

  const lidarMudancaTexto = (valor, nome) => {
    setUsuario(prevState => ({ ...prevState, [nome]: valor }));
  };

  const getUsuarioPorId = async (id) => {
    try {
      const dbRef = firebase.firestore().collection('usuarios').doc(id);
      const doc = await dbRef.get();
      const usuarioData = doc.data();
      setUsuario({ ...usuarioData, id: doc.id });
    } catch (error) {
      console.log(error);
    }
  };

  const adicionarUsuario = async () => {
    try {
      const dbRef = firebase.firestore().collection('usuarios');
      const doc = await dbRef.add(usuario);
      setUsuario({ ...usuario, id: doc.id });
      props.navigation.navigate('ListaTelaUsuario');
    } catch (error) {
      console.log(error);
    }
  };

  const atualizarUsuario = async () => {
    try {
      const userRef = firebase.firestore().collection('usuarios').doc(usuario.id);
      await userRef.update({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone
      });
      props.navigation.navigate('ListaTelaUsuario');
    } catch (error) {
      console.log(error);
    }
  };

  const apagarUsuario = async () => {
    try {
      const dbRef = firebase.firestore().collection('usuarios').doc(usuario.id);
      await dbRef.delete();
      props.navigation.navigate('ListaTelaUsuario');
    } catch (error) {
      console.log(error);
    }
  };

  const salvarUsuario = async () => {
    try {
      if (novoUsuario) {
        await adicionarUsuario();
      } else {
        await atualizarUsuario();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      setNovoUsuario(false);
      getUsuarioPorId(usuarioId);
    } else {
      setNovoUsuario(true);
      setUsuario({ nome: '', email: '', telefone: '' });
    }
  }, [usuarioId]);

  if (novoUsuario && !usuario) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nome"
          value={usuario ? usuario.nome : ''}
          onChangeText={(valor) => lidarMudancaTexto(valor, 'nome')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          value={usuario ? usuario.email : ''}
          onChangeText={(valor) => lidarMudancaTexto(valor, 'email')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Telefone"
          value={usuario ? usuario.telefone : ''}
          onChangeText={(valor) => lidarMudancaTexto(valor, 'telefone')}
        />
      </View>
            <View style={styles.botao}>
        <Button title="Apagar" color="red" onPress={apagarUsuario} />
      </View>
      <Button
        title={novoUsuario ? 'Adicionar' : 'Atualizar'}
        color="blue"
        onPress={salvarUsuario}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  inputGroup: {
    flex: 1,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  botao: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default DetalheTelaUsuario;
