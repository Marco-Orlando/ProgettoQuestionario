import * as React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const About = (props) => {
  const naviga = () => {
    props.navigation.navigate('Home');
  };
  return (
    <View>
    
      <Text>Francesco Sparascio</Text>
      <Text>Marco Orlando</Text>
      <Text>Lorenzo Reho</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default About;
