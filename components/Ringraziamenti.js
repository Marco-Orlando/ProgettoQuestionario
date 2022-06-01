// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity, 
  Image
} from 'react-native';

const Ringraziamenti:React.FC=(props)=>{
  return(
    <View style={styles.centered}>
      <Text style={styles.title}>Grazie per aver partecipato!</Text>
      <Image source={require('../assets/emojiSorridente.jpg')} style={styles.image} />
      <View style={styles.viewBtn}>
        <TouchableOpacity onPress={()=>{props.navigation.navigate("Home")}} style={styles.button}>
          <Text style={styles.buttonTextStyle}>Fine</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'lightblue',
    paddingTop:"50%"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 30,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FE434C',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 10,
    margin: 10,
    height: 40,
    width: 150,
  },
  buttonTextStyle: {
    color: '#fff',
  },
  viewBtn: {
    marginTop: 20,
    flex: 1,
    align: 'center',
  },
  image: {
    width: 183,
    height: 180,
    resizeMode: 'contain',
    borderRadius:40,
    borderWidth:2,
    borderColor:'yellow'
  },
});