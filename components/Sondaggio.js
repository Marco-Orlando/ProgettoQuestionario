// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { RadioButtonGroup, RadioButtonItem } from 'expo-radio-button';

const Sondaggio: React.FC = (props) => {
  const [risposta, setRisposta] = useState('');
  const [domanda, setDomanda] = useState('');
  const [ris1, setRis1] = useState('');
  const [ris2, setRis2] = useState('');
  const [ris3, setRis3] = useState('');
  const [ris4, setRis4] = useState('');
  const [conta, setConta] = useState(0);
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(false);
  const [invio, setInvio] = useState(false);

  const popola = (datas) => {
    const vet = [];
    for (var i = 0; i < datas.length; i++) {
      const ogg = {
        Domanda: datas[i].Domanda,
        Risposta_1: datas[i].Risposta_1,
        Risposta_2: datas[i].Risposta_2,
        Risposta_3: datas[i].Risposta_3,
        Risposta_4: datas[i].Risposta_4,
        Risposta: '',
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
    setRis4(data[indice].Risposta_4);
    if(risposta==''){
      setRisposta(data[indice].Risposta);
    }
  };

  const selezionato = (valore) => {
    setRisposta(valore);
  };

  const avanti = () => {
    setRisposta('');

    if (conta < data.length - 1) {
      // prendo la domanda e la risposta
      setConta(conta + 1);
      if (conta + 1 == data.length - 1) {
        setEnd(true);
      }
    } else {
      termina();
    }
  };

  const indietro = () => {
    setRisposta('');

    if (conta > 0) {
      setEnd(false);
      setConta(conta - 1);
    } else {
      props.navigation.goBack();
    }
  };

  const termina = async () => {
    setInvio(true);
    for (var i = 0; i < data.length; i++) {
      try {
        const richiesta =
          '{"domanda":"' +
          data[i].Domanda +
          '", "risposta":"' +
          data[i].Risposta +
          '"}';
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=post&oggetto=' +
          richiesta
        );
      } catch (error) {
        <Text>Errore</Text>;
      }
    }
    props.navigation.navigate('Feedback');
  };

  const prelevaDomande = async () => {
    try {
      if (data.length == 0) {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=getDomande'
        );
        const json = await response.json();
        popola(json);
      } else {
        renderizza(conta);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    prelevaDomande();
    if (risposta != '') data[conta].Risposta = risposta;
  });

  if ((domanda != '' || ris1 != '' || ris2 != '' || ris3 != '') && !invio) {
    return (
      <View style={styles.centered}>
          <Text style={styles.textDomanda}>{conta + 1 + ". " + domanda}</Text>
        <RadioButtonGroup
          containerStyle={{
            borderWidth: 1,
            width: "70%",
            height: "35%",
            borderRadius: 30,
            backgroundColor: 'white',
            marginTop: 150,
          }}
          selected={risposta}
          onSelected={(value) => {
            selezionato(value);
          }}>
          <RadioButtonItem
            style={{ margin: 20 }}
            value={ris1}
            label={
              <Text>
                {ris1}
              </Text>
            }
          />
          <RadioButtonItem
            style={{ margin: 20 }}
            value={ris2}
            label={
              <Text >
                {ris2}
              </Text>
            }
          />
          <RadioButtonItem
            style={{ margin: 20}}
            value={ris3}
            label={
              <Text >
                {ris3}
              </Text>
            }
          />
          <RadioButtonItem
            style={{ margin: 20 }}
            value={ris4}
            label={
              <Text >
                {ris4}
              </Text>
            }
          />
        </RadioButtonGroup>
        <View style={styles.viewBtn}>
          <TouchableOpacity onPress={avanti} style={styles.button}>
            <Image
              source={require('../assets/next.png')}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>
              {!end ? 'Avanti' : 'Termina'}{' '}
            </Text>
          </TouchableOpacity>
          {conta != 0 && (
            <TouchableOpacity onPress={indietro} style={styles.button}>
              <Image
                source={require('../assets/back.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Indietro</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.centered}>
        <Image
          source={require('../assets/loading.gif')}
          style={{ width: 100, height: 100 }}
        />
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
    backgroundColor: 'lightblue',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE434C',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 10,
    margin: 10,
    height: 40,
    width: 200,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginLeft: 10,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  viewBtn: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
  },

  textDomanda: {
      position:'absolute',
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'red',
      fontSize: 20,
      top: 50
  }
});

export default Sondaggio;
