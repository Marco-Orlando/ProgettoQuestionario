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

const Feedback:React.FC=(props)=>{
  
  const [feedback,setFeedback]=useState('');
  const [invio,setInvio]=useState(false);

  const invia= async ()=>{
    if(feedback!=''){
      setInvio(true);
      try {
          const richiesta ='{"Feedback":"' + feedback +'"}';
          const response = await fetch(
              'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=postFeedback&feedback=' +richiesta
        );
      }
      catch (error) {
        <Text>Errore</Text>;
      }
      props.navigation.navigate("Ringraziamenti");
    }
    else{
      alert("Inserire qualcosa o saltare questo passaggio!");
    }
  }
  if(!invio){
    return(
      <View style={styles.centered}>
        <Text style={styles.subtitle}>E perchè non darci un feedback...</Text>
        <TextInput style={styles.input} placeholder="Inserisci qui le tue considerazioni" multiline={true} onChangeText={(testo)=>{setFeedback(testo)}}/>
        <View style={{flexDirection:'row'}}>
          <Pressable onPress={()=>{props.navigation.navigate("Ringraziamenti")}} style={styles.button}>
            <Text>SALTA</Text>
          </Pressable>
          <Pressable onPress={invia} style={styles.button}>
            <Text>INVIA</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  else{
    return(
    <View style={styles.centered}>
      <Image source={require('../assets/loading.gif')} style={{width: 100, height: 100 }}/>
    </View>
    );
  }
}

export default Feedback;

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
  input:{
    width:"80%",
    height:100,
    borderRadius:10,
    borderWidth:1,
    padding:10
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