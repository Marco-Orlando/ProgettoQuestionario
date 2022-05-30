// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,Image,Pressable
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { RadioButtonGroup, RadioButtonItem } from 'expo-radio-button';
import PieChartView from './PieChartView'


const Statistiche:React.FC=(props)=>{

  const [scelta,setScelta]=useState('');

  const naviga=()=>{
    props.navigation.navigate(scelta)
  }

    return(
      <View style={styles.centered}>
          <Text style={styles.title}>Tipo grafico</Text>
          <RadioButtonGroup selected={scelta} onSelected={(value)=>{setScelta(value)}}>
            <RadioButtonItem style={{margin:10}} value={"PieChart"} label={<Text>PieChart</Text>} />
            <RadioButtonItem style={{margin:10}} value={"BarChart"} label={<Text>BarChart</Text>} />
          </RadioButtonGroup>
          <Pressable onPress={naviga}style={styles.button}>
            <Text>{"MOSTRA"} </Text>
          </Pressable>
      </View>
    );
  }

export default Statistiche;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom:30
  },
  button: {
    textAlign:'center',
    alignItems:'center',
    backgroundColor: 'lightblue',
    justifyContent:'center',
    width:100,
    marginTop: 20,
    marginHorizontal:15,
    padding:5,
    borderWidth: 1,
    borderRadius:10
  }
});