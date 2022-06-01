// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { RadioButtonGroup, RadioButtonItem } from 'expo-radio-button';
import PieChartView from './PieChartView';

const Statistiche: React.FC = (props) => {
  const [scelta, setScelta] = useState('');

  const naviga = () => {
    props.navigation.navigate(scelta);
  };

  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Tipo grafico</Text>
      <RadioButtonGroup
        selected={scelta}
        onSelected={(value) => {
          setScelta(value);
        }}
        containerStyle={{
          borderWidth: 1,
          backgroundColor: 'white',
          width: 190,
          height: 120,
          borderRadius:30,
          marginTop: 240,
          padding: 6
        }}>
        <RadioButtonItem
          style={{ margin: 15 }}
          value={'PieChart'}
          label={<Text>Grafico a torta</Text>}
        />
        <RadioButtonItem
          style={{ margin: 15 }}
          value={'BarChart'}
          label={<Text>Grafico a barre</Text>}
        />
      </RadioButtonGroup>

      <View style={styles.viewBtn}>
        <TouchableOpacity onPress={naviga} style={styles.button}>
          <Image
            source={require('../assets/view.png')}
            style={styles.buttonImageIconStyle}
          />
          <View style={styles.buttonIconSeparatorStyle} />
          <Text style={styles.buttonTextStyle}>Visualizza</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Statistiche;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
      position: 'absolute',
      left: 130,
      top: 180,
      fontWeight: 'bold',
      color: 'red',
      fontSize: 20,
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
