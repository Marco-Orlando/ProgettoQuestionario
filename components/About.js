import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PersonAbout from './PersonAbout';

const Stack = createStackNavigator();

const About = (props) => {
  const naviga = () => {
    props.navigation.navigate('Home');
  };
  return (
    <View style={styles.centered}> 
      <PersonAbout
        nome={'Lorenzo Reho'}
        email={'lorenzoreho852@gmail.com'}
        titolo={'Studente Informatico 4° anno A. Meucci'}
      />
      <PersonAbout
        nome={'Marco Orlando'}
        email={'marco.orlando04@gmail.com'}
        titolo={'Studente Informatico 4° anno A. Meucci'}
      />
      <PersonAbout
        nome={'Francesco Sparascio'}
        email={'francescosparascio04@gmail.com'}
        titolo={'Studente Informatico 4° anno A. Meucci'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  }
});

export default About;
