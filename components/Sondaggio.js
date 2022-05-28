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
import { RadioButtonGroup, RadioButtonItem } from 'expo-radio-button';

const Sondaggio: React.FC = (props) => {
  const [risposta, setRisposta] = useState('');
  const [domanda, setDomanda] = useState('');
  const [ris1, setRis1] = useState('');
  const [ris2, setRis2] = useState('');
  const [ris3, setRis3] = useState('');
  const [conta, setConta] = useState(0);
  const [numQues, setNumQues] = useState(0);
  const [data, setData] = useState([]);

  const popola = (datas) => {
    const vet=[];
    for (var i = 0; i < datas.length; i++) {
      const ogg = {
        Domanda: datas[i].Domanda,
        Risposta_1: datas[i].Risposta_1,
        Risposta_2: datas[i].Risposta_2,
        Risposta_3: datas[i].Risposta_3,
      };
      vet.push(ogg);
    }
    setData(vet);
  };

  const renderizza = (indice) => {
    setDomanda(data[indice].Domanda);
    setRis1(data[indice].Risposta_1);
    setRis2(data[indice].Risposta_2);
    setRis3(data[indice].Risposta_3);
  };

  const invia = async () => {
    if(risposta!=''){
      setRisposta('');
      try {
        const richiesta =
          '{"domanda":"' + domanda + '", "risposta":"' + risposta + '"}';
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=post&oggetto=' +
            richiesta
        );
      } catch (error) {
        <Text>Errore</Text>;
      } finally {
        if (conta < data.length-1) {
          setConta(conta + 1);
          
        } else {
          props.navigation.goBack();
        }
      }
    }
  };
  const prelevaDomande = async () => {
      try {
        if(data.length == 0){
          const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=getDomande'
          ); 
          const json = await response.json();
          popola(json);
        }else{
          renderizza(conta);
        }
      } catch (error) {
        console.log(error);
      }
     };

  useEffect(() => {
      prelevaDomande();
  });
  if(domanda!=''||ris1!=''||ris2!=''||ris3!=''){
    return (
      <View style={styles.centered}>
        <Text style={styles.subtitle}>{domanda}</Text>
        <RadioButtonGroup selected={risposta} onSelected={(value)=>{setRisposta(value)}}>
          <RadioButtonItem value={ris1} label={<Text>{ris1}</Text>} />
          <RadioButtonItem value={ris2} label={<Text>{ris2}</Text>} />
          <RadioButtonItem value={ris3} label={<Text>{ris3}</Text>} />
        </RadioButtonGroup>
        <Pressable onPress={invia} style={styles.button}>
          <Text > INVIA </Text>
        </Pressable>
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
};

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
  button: {
    textAlign:'center',
    alignItems:'center',
    backgroundColor: 'lightblue',
    justifyContent:'center',
    width: 70,
    height: 30,
    marginTop: 20,
    borderWidth: 1,
  },
});

export default Sondaggio;

