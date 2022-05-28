// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import { TextInput , Text, View, StyleSheet, Pressable, Button } from 'react-native';
import {CheckBox} from 'react-native-elements';

const Questionario: React.FC = () => {

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState();
  const [error, setError] = useState();
  
  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=get');
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    };
    loadAsyncStuff();
  }, []);
  
  return (
    
    <View style={styles.centered}>
      
      <Text>{JSON.stringify(data, null, 2)}</Text>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 30,
    margin: 10
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 30,
    margin: 10
  },
      input: {
    width:200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Questionario;