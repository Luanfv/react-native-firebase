import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(undefined);

  const signIn = useCallback(async (email, password) => {
    await auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
        Alert.alert('SUCESSO', 'Autenticação realizada com sucesso!');
        setUser(response.user)
    })
    .catch(err => {
        Alert.alert('FRACASSO', 'Ocorreu um erro inesperado!');
        console.log(err);
    });

    setEmail('');
    setPassword('');
  }, [auth]);

  const signOut = useCallback(async () => {
    await auth().signOut();
    setUser(undefined);
  }, [auth])

  return (
    <ScrollView
      style={{
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      {
        user
        ?
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text>
            Bem-vindo(a), {user.email}
          </Text>
          <Button 
            title="Sair"
            onPress={signOut}
          />
        </View>
        :
        <>
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
            title="Entrar"
            onPress={() => signIn(email, password)}
          />
        </>
      }
    </ScrollView>
  );
};

export default SignIn;