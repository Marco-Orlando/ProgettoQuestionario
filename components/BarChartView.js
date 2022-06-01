// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarChartView: React.FC = (props) => {
  const [dati, setDati] = useState([]);
  const [domande, setDomande] = useState([]);
  const [conta, setConta] = useState(0);

  const caricaDomande = (datas) => {
    const vet = [];
    for (var i = 0; i < datas.length; i++) {
      vet.push(JSON.stringify(datas[i].Domanda));
    }
    setDomande(vet);
  };

  const popola = (datas) => {
    const vet = [];
    for (var i = 0; i < datas.length; i++) {
      const ogg = {
        Domanda: datas[i].Domanda,
        Risposta_1: datas[i].Risposta_1,
        Num_R1: datas[i].Num_R1,
        Risposta_2: datas[i].Risposta_2,
        Num_R2: datas[i].Num_R2,
        Risposta_3: datas[i].Risposta_3,
        Num_R3: datas[i].Num_R3,
        Risposta_4: datas[i].Risposta_4,
        Num_R4: datas[i].Num_R4,
      };
      vet.push(ogg);
    }
    console.log(vet);
    setDati(vet);
  };

  const prelevaStatistiche = async () => {
    try {
      if (dati.length == 0) {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=getStatistiche'
        );
        const json = await response.json();
        popola(json);
        caricaDomande(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    prelevaStatistiche();
  });

  const indietro = () => {
    if (conta > 0) {
      setConta(conta - 1);
    } else {
      props.navigation.goBack();
    }
  };

  const avanti = () => {
    if (conta < dati.length - 1) {
      setConta(conta + 1);
    }
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientToOpacity: 0.2,
    color: () => 'darkwhite',
  };

  if (dati.length != 0) {
    return (
      <View style={styles.centered}>
          <Text style={styles.title}>{domande[conta]}</Text>
          <BarChart
            style={styles.grafico}
            data={{
              labels: [
                "Risposta_1",
                "Risposta_2",
                "Risposta_3",
                "Risposta_4",
              ],
              datasets: [
                {
                  data: [
                    dati[conta].Num_R1,
                    dati[conta].Num_R2,
                    dati[conta].Num_R3,
                    dati[conta].Num_R4,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width * 0.95}
            height={Dimensions.get('window').height * 0.4}
            yAxisLabel=""
            chartConfig={chartConfig}
            fromZero={true}
            showValuesOnTopOfBars={true}
            
          />
          <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>Risposta_1: </Text>
            <Text style={{marginBottom:5,textAlign:'center'}}>{dati[conta].Risposta_1}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>Risposta_2: </Text>
            <Text style={{marginBottom:5,textAlign:'center'}}>{dati[conta].Risposta_2}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>Risposta_3: </Text>
            <Text style={{marginBottom:5,textAlign:'center'}}>{dati[conta].Risposta_3}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:'bold'}}>Risposta_4: </Text>
            <Text style={{marginBottom:5,textAlign:'center'}}>{dati[conta].Risposta_4}</Text>
          </View>
          </View>
          <View style={styles.viewBtn}>{conta != dati.length - 1 && (
              <TouchableOpacity onPress={avanti} style={styles.button}>
                <Image
                  source={require('../assets/next.png')}
                  style={styles.buttonImageIconStyle}
                />
                <View style={styles.buttonIconSeparatorStyle} />
                <Text style={styles.buttonTextStyle}>{'Avanti'}</Text>
              </TouchableOpacity>
            )}
            {conta != 0 && (
              <TouchableOpacity onPress={indietro} style={styles.button}>
                <Image
                  source={require('../assets/back.png')}
                  style={styles.buttonImageIconStyle}
                />
                <View style={styles.buttonIconSeparatorStyle} />
                <Text style={styles.buttonTextStyle}>{'Indietro'}</Text>
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

export default BarChartView;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingTop:50
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 30,
    color: 'red',
    textAlign: 'center'
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
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
  },
  grafico: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'blue',
    padding: 2,
    marginBottom: 20
  },
});
