// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const PieChartView: React.FC = (props) => {
  const [dati, setDati] = useState([]);
  const [datiGrafico, setDatiGrafico] = useState([]);
  const [domande, setDomande] = useState([]);
  const [conta, setConta] = useState(0);

  const caricaDomande = (datas) => {
    const vet = [];
    for (var i = 0; i < datas.length; i++) {
      vet.push(JSON.stringify(datas[i].Domanda));
    }
    setDomande(vet);
  };

  const popolaGrafici = (datas) => {
    const vet = [];
    const vet2 = [];
    for (var i = 0; i < datas.length; i++) {
      const record = [];
      const ogg1 = {
        name: datas[i].Risposta_1,
        population: datas[i].Num_R1,
        color: 'red',
        legendFontColor: 'red',
        legendFontSize: 15,
      };
      const ogg2 = {
        name: datas[i].Risposta_2,
        population: datas[i].Num_R2,
        color: 'blue',
        legendFontColor: 'blue',
        legendFontSize: 15,
      };
      const ogg3 = {
        name: datas[i].Risposta_3,
        population: datas[i].Num_R3,
        color: 'green',
        legendFontColor: 'green',
        legendFontSize: 15,
      };
      const ogg4 = {
        name: datas[i].Risposta_4,
        population: datas[i].Num_R4,
        color: 'grey',
        legendFontColor: 'grey',
        legendFontSize: 15,
      };
      record.push(ogg1);
      record.push(ogg2);
      record.push(ogg3);
      record.push(ogg4)
      const oggettoFinale = { record };
      vet.push(oggettoFinale);
      const ogg2_1={...ogg1};
      const ogg2_2={...ogg2};
      const ogg2_3={...ogg3};
      const ogg2_4={...ogg4};
      ogg2_1.name='';
      ogg2_2.name='';
      ogg2_3.name='';
      ogg2_4.name='';
      var record2=[];
      record2.push(ogg2_1);
      record2.push(ogg2_2);
      record2.push(ogg2_3);
      record2.push(ogg2_4)
      const oggettoFinale2 = { record2 };
      vet2.push(oggettoFinale2);

    }
    console.log(vet)
    setDatiGrafico(vet2);
    setDati(vet);
    
  };

  const prelevaStatistiche = async () => {
    try {
      if (dati.length == 0) {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=getStatistiche'
        );
        const json = await response.json();
        popolaGrafici(json);
        caricaDomande(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    prelevaStatistiche();
  });

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
  };

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
  if (dati.length != 0) {
    return (
      <View style={styles.centered}>
        <View>
          <Text style={styles.title}>{domande[conta]}</Text>
          <PieChart
            data={datiGrafico[conta].record2}
            width={300}
            height={220}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={75}
            hasLegend={true}
          />
          <View style={{alignItems:'center'}}>
          <Text style={{color:dati[conta].record[0].color, marginBottom:5,textAlign:'center'}}>{dati[conta].record[0].name}</Text>
          <Text style={{color:dati[conta].record[1].color, marginBottom:5,textAlign:'center'}}>{dati[conta].record[1].name}</Text>
          <Text style={{color:dati[conta].record[2].color, marginBottom:5,textAlign:'center'}}>{dati[conta].record[2].name}</Text>
          <Text style={{color:dati[conta].record[3].color,textAlign:'center'}}>{dati[conta].record[3].name}</Text>
          </View>
          <View style={styles.viewBtn}>
            {conta!=dati.length-1&&(<TouchableOpacity onPress={avanti} style={styles.button}>
              <Image
                source={require('../assets/next.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Avanti</Text>
            </TouchableOpacity>)} 
            {conta!=0&&(<TouchableOpacity onPress={indietro} style={styles.button}>
              <Image
                source={require('../assets/back.png')}
                style={styles.buttonImageIconStyle}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Indietro</Text>
            </TouchableOpacity>)}
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

export default PieChartView;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingTop:20
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
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
  },
});
