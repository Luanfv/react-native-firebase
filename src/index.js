import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const addUser = useCallback(async () => {
    if (!position || !name)
      return false;

    const db = await database().ref('users');
    const key = db.push().key;

    db.child(key).set({
      name,
      position,
    });

    Alert.alert('SUCESSO', 'Funcionario cadastrado com sucesso!');

    setName('');
    setPosition('');
  }, [name, position]);

  useEffect(() => {
    async function start() {
      // // listening
      // database().ref('users/2').on('value', (snapshot) => {
      //  setUser(snapshot.val().name);
      // });

      // // one search
      // database().ref('users/1').once('value', (snapshot) => {
      //   setUser(snapshot.val().name);
      // });

      // // create new nodo
      // await database().ref('teste').set(1);

      // // remove nodo
      // await database().ref('teste').remove();

      // // add children
      // await database().ref('users').child('4').set({
      //   name: 'Carlinhos',
      //   age: 28
      // });

      // // update data
      // await database().ref('users').child('4').update({
      //   name: 'Carlos',
      // });
    }

    start();
  }, []);

  return (
    <View
      style={{
        padding: 20
      }}
    >
      <Text>
        Nome
      </Text>
      <TextInput 
        onChangeText={setName}
        value={name}
        style={{
          borderWidth: 1,
          borderColor: '#000',
          marginBottom: 15
        }}
      />
    
      <Text>
        Cargo
      </Text>
      <TextInput
        onChangeText={setPosition}
        value={position}
        style={{
          borderWidth: 1,
          borderColor: '#000',
          marginBottom: 15
        }}
      />

      <Button 
        title="Cadastrar"
        onPress={addUser}
      />
    </View>
  );
};

export default App;