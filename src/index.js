import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');

  const handleUsers = useCallback(async () => {
    await database().ref('users').once('value', snapshot => {
      const childrens = [];

      snapshot.forEach(childrenItem => {
        const { name, position } = childrenItem.val();

        childrens.push({
          key: childrenItem.key,
          name,
          position,
        });
      });

      setUsers(childrens.reverse());
    });
  }, []);

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
    handleUsers();
  }, [name, position, handleUsers]);

  useEffect(() => {
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

    handleUsers();
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
      </View>

      <Button 
        title="Cadastrar"
        onPress={addUser}
      />

      <View style={{
        marginVertical: 40,
      }}>
        {
          users.map(user => (
            <View 
              key={user.key}
              style={{
                paddingTop: 10,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#000',
              }}
            >
              <Text>
                Nome: {user.name}
              </Text>
              <Text>
                Cargo: {user.position}
              </Text>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
};

export default App;