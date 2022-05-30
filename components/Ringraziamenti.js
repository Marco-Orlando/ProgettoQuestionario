// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Pressable, 
  Image
} from 'react-native';

const Ringraziamenti:React.FC=(props)=>{
  return(
    <View style={styles.centered}>
      <Text style={styles.subtitle}>Grazie per aver partecipato!</Text>
      <Image source={require('../assets/emojiSorridente.jpg')} style={styles.image} />
      <Pressable onPress={()=>{props.navigation.navigate("Home")}} style={styles.button}>
        <Text>FINE</Text>
      </Pressable>
    </View>
  );
}

export default Ringraziamenti;

// Stili utilizzati
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 30,
    margin: 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain'
  },
  button: {
    textAlign:'center',
    alignItems:'center',
    backgroundColor: 'lightblue',
    justifyContent:'center',
    width:100,
    marginTop: 40,
    marginHorizontal:15,
    padding:5,
    borderWidth: 1,
    borderRadius:10
  }
});