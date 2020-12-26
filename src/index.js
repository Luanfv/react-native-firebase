import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  const [user, setUser] = useState('Carregando...');

  useEffect(() => {
    async function start() {
      // // listening
      // database().ref('users/2').on('value', (snapshot) => {
      //  setUser(snapshot.val().name);
      // });

      // one search
      database().ref('users/1').once('value', (snapshot) => {
        setUser(snapshot.val().name);
      });
    }

    start();
  }, []);

  return (
    <View>
      <Text>
        Olá {user}
      </Text>
    </View>
  );
};

export default App;