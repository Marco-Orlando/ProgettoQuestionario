import * as React from 'react';
import { TextInput , Text, View, StyleSheet, Pressable, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Questionario from './components/Questionario'
import Sondaggio from './components/Sondaggio'
import Statistiche from './components/Statistiche'

const Stack = createStackNavigator();

const Home = (props) => {
  const naviga = () =>{
    props.navigation.navigate('Sondaggio');
  }
  const onStatistiche = () =>{
    props.navigation.navigate('Statistiche');
  }
  return (
    <View style={styles.centered}>
      <Text style={styles.title}> Questionario 4CI</Text>  
      <Image style={styles.image} source={require('./assets/questionario.jpg')} />
      <Text style={styles.subtitle}> Raccolta dati studenti 4CI</Text>  
      <Pressable onPress={naviga}>
        <Text style={styles.input}> INIZIA </Text>  
      </Pressable>
      <Pressable onPress={onStatistiche}>
        <Text style={styles.input}> STATISTICHE </Text>  
      </Pressable>
    </View>
  )
}

const App: React.FC = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Sondaggio" component={Sondaggio}/>
            <Stack.Screen name="Questionario" component={Questionario}/>
            <Stack.Screen name="Statistiche" component={Statistiche}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
};

// Stili utilizzati
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 30,
    margin: 10
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 20,
    margin: 10
  },

  input: {
    textAlign: 'center',
    backgroundColor: 'lightblue',
    width:200,
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius:15,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain'

  }
});

export default App;