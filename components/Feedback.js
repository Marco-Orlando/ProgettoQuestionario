// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const Feedback: React.FC = (props) => {
  const [feedback, setFeedback] = useState('');
  const [invio, setInvio] = useState(false);

  const invia = async () => {
    if (feedback != '') {
      setInvio(true);
      try {
        const richiesta = '{"Feedback":"' + feedback + '"}';
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=postFeedback&feedback=' +
            richiesta
        );
      } catch (error) {
        <Text>Errore</Text>;
      }
      props.navigation.navigate('Ringraziamenti');
    } else {
      alert('Inserire qualcosa o saltare questo passaggio!');
    }
  };
  if (!invio) {
    return (
      <View style={styles.centered}>
        <View style={{ margin: 120 }}>
          <Text style={styles.title}>E perchè non darci un feedback...</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci qui le tue considerazioni"
            multiline={true}
            onChangeText={(testo) => {
              setFeedback(testo);
            }}
          />
          <View style={styles.viewBtn}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Ringraziamenti');
              }}
              style={styles.button}>
              <Image
                source={require('../assets/skip.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Salta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={invia} style={styles.button}>
              <Image
                source={require('../assets/send.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Invia</Text>
            </TouchableOpacity>
          </View>
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

export default Feedback;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginButtom: 30,
    color: 'red',
    textAlign: 'center',
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
  input: {
    width: 250,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
