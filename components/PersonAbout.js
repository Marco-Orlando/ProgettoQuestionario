import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface iProps {
  nome: string;
  email: string;
  titolo: string;
}

const PersonAbout: React.FC<iProps> = (parametri: iProps) => {
  return (
      <View style={styles.box}>
        <Image source={require('../assets/user.png')} style={styles.img} />
        <Text style={styles.nome}>{parametri.nome}</Text>
        <Text style={styles.email}>{parametri.email}</Text>
        <Text style={styles.words}>{parametri.titolo}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 350,
    height: 100,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 20,
  },
  img: {
    height: 80,
    width: 120,
    resizeMode: 'contain',
    top: 10,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    position: 'absolute',
    left: 130,
    top: 5,
  },
  email: {
    position: 'absolute',
    left: 110,
    top: 45,
    textAlign: 'center',
  },
  words: {
    position: 'absolute',
    left: 95,
    top: 75,
  },
});

export default PersonAbout;
