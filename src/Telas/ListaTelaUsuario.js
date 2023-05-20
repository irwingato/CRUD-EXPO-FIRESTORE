import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

import firebase from '../banco_de_dados/firebase';

function ListaTelaUsuario(props) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('usuarios').onSnapshot((snapshot) => {
      const usuariosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsuarios(usuariosData);
    });

    return () => {
      // Limpar o listener ao desmontar o componente
      unsubscribe();
    };
  }, []);

  const adicionarUsuario = async () => {
    // Adicionar lógica para adicionar o usuário no Firebase
  };

  return (
    <ScrollView>
      <Button
        title="Criar usuário"
        onPress={() => props.navigation.navigate("CriarTelaUsuario")}
      />
      {usuarios.map((usuario) => (
        <ListItem
          key={usuario.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("DetalheTelaUsuario", {
              usuarioId: usuario.id,
            });
          }}
        >
          <ListItem.Chevron />
          <Avatar source={{ uri: usuario.foto }} rounded />
          <ListItem.Content>
            <ListItem.Title>{usuario.nome}</ListItem.Title>
            <ListItem.Subtitle>{usuario.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}

export default ListaTelaUsuario;