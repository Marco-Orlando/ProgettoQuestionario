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
import Questionario from './components/Questionario';
import Sondaggio from './components/Sondaggio';
import Statistiche from './components/Statistiche';
import Feedback from './components/Feedback';
import Ringraziamenti from './components/Ringraziamenti';
import PieChartView from './components/PieChartView';
import BarChartView from './components/BarChartView';
import About from './components/About';

const Stack = createStackNavigator();

const Home = (props) => {
  const naviga = () => {
    props.navigation.navigate('Sondaggio');
  };
  const onStatistiche = () => {
    props.navigation.navigate('Statistiche');
  };

  const onAbout = () => {
    props.navigation.navigate('About');
  };

  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Sondaggio</Text>
      <View style={styles.container}>
        <Image
          style={styles.locandina}
          source={require('./assets/locandina.jpg')}
        />
      </View>

      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.button} onPress={naviga}>
          <Image
            source={require('./assets/start.png')}
            style={styles.buttonImageIconStyle}
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonTextStyle}>Inizia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onStatistiche}>
          <Image
            source={require('./assets/chart.png')}
            style={styles.buttonImageIconStyle}
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonTextStyle}>Statistiche</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onAbout}>
          <Image
            source={require('./assets/person.png')}
            style={styles.buttonImageIconStyle}
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonTextStyle}>Chi siamo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sondaggio" component={Sondaggio} />
        <Stack.Screen name="Questionario" component={Questionario} />
        <Stack.Screen name="Statistiche" component={Statistiche} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Ringraziamenti" component={Ringraziamenti} />
        <Stack.Screen name="PieChart" component={PieChartView} />
        <Stack.Screen name="BarChart" component={BarChartView} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    margin: 20,
    textAlign: 'center',
    color: 'red',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  locandina: {
    width: '100%',
    height: 360,
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
});

export default App;
