import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = useCallback(async (email, password) => {
    await auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        Alert.alert('SUCESSO', 'E-mail cadastrado com sucesso!');
    })
    .catch(err => {
        if (err.code === 'auth/weak-password') {
            Alert.alert('FRACASSO', 'A senha deve ter pelo menos 6 caracteres!');

            return;
        }
    
        if (err.code === 'auth/invalid-email') {
            Alert.alert('FRACASSO', 'E-mail inválido!');

            return;
        }

        if (err.code === 'auth/email-already-in-use') {
            Alert.alert('FRACASSO', 'Esse e-mail já está sendo usado!');

            return;
        }


        Alert.alert('FRACASSO', 'Ocorreu um erro inesperado!');
        console.log(err);
    });

    setEmail('');
    setPassword('');
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      <View 
        style={{
          marginTop: 20
        }}
      >
        <Text>
          E-mail
        </Text>
        <TextInput 
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: '#000',
            marginBottom: 15
          }}
        />
      
        <Text>
          Senha
        </Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: '#000',
            marginBottom: 15
          }}
        />
      </View>

      <Button 
        title="Cadastrar"
        onPress={() => register(email, password)}
      />
    </ScrollView>
  );
};

export default App;