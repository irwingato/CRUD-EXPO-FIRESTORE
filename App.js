import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CriarTelaUsuario from "./src/Telas/CriarTelaUsuario";
import DetalheTelaUsuario from "./src/Telas/DetalheTelaUsuario";
import ListaTelaUsuario from "./src/Telas/ListaTelaUsuario";

const Stack = createStackNavigator();

function MinhaPilha () {
  return ( 
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621ff7"
        },
        headerTintColor: "#fff",
        headerTitlestyle: {
          fontWeight: "bold"
        }
      }}
  >
    <Stack.Screen 
    name="ListaTelaUsuario" 
    component={ListaTelaUsuario}
    options={{ title : "Listagem de Usuários" }}
    />

    <Stack.Screen 
    name="CriarTelaUsuario" 
    component={CriarTelaUsuario}
    options={{ title : "Criar Usuário" }}
    />

    <Stack.Screen 
    name="DetalheTelaUsuario" 
    component={DetalheTelaUsuario}
    options={{ title : "Detalhe do Usuário" }}
    />
    </Stack.Navigator>
  ); 
}

function App () {
  return (
    <NavigationContainer>
    <MinhaPilha />
    </NavigationContainer>
  );
}

export default App;