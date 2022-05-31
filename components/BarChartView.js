// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,Image,Pressable,Dimensions
} from 'react-native';
import {BarChart} from "react-native-chart-kit";

const BarChartView:React.FC=(props)=>{

  const [dati,setDati]=useState([]);
  const [domande,setDomande]=useState([]);
  const [conta,setConta]=useState(0);

  const caricaDomande=(datas)=>{
    const vet=[];
    for(var i=0;i<datas.length;i++){
      vet.push(JSON.stringify(datas[i].Domanda));
    }
    setDomande(vet);
  }

  const popola = (datas) => {
    const vet=[];
    for (var i = 0; i < datas.length; i++) {
      const ogg = {
        Domanda: datas[i].Domanda,
        Risposta_1: datas[i].Risposta_1,
        Num_R1:datas[i].Num_R1,
        Risposta_2: datas[i].Risposta_2,
        Num_R2:datas[i].Num_R2,
        Risposta_3: datas[i].Risposta_3,
        Num_R3:datas[i].Num_R3,
        Risposta_4: datas[i].Risposta_4,
        Num_R4:datas[i].Num_R4
      };
      vet.push(ogg);
    }
    console.log(vet)
    setDati(vet);
  };

  const prelevaStatistiche = async () => {
      try {
        if(dati.length==0){
          const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=getStatistiche'
          ); 
          const json = await response.json();
          popola(json);
          caricaDomande(json);
        }
      }
      catch (error) {
        console.log(error);
      }
     };

  useEffect(() => {
      prelevaStatistiche();
  });

  const indietro = () => {
    if (conta > 0){
      setConta(conta - 1);  
    }
    else{
      props.navigation.goBack();
    }
  }

  const avanti = () => {
      if (conta < dati.length-1) {
        setConta(conta + 1);  
      } 
  }

  const chartConfig = {
    backgroundGradientFromOpacity: 0.2,
    backgroundGradientToOpacity: 0.2,
    color: () => 'black'
  };

  if(dati.length!=0){
    return(
      <View style={styles.centered}>
        <Text style={styles.title}>{domande[conta]}</Text>
        <BarChart
          style={styles.grafico}
          data={{
            labels:
            [dati[conta].Risposta_1,dati[conta].Risposta_2,dati[conta].Risposta_3,dati[conta].Risposta_4],
            datasets:
            [{data:[dati[conta].Num_R1,dati[conta].Num_R2,dati[conta].Num_R3,dati[conta].Num_R4]}]
          }}
          width={Dimensions.get('window').width*0.9}
          height={Dimensions.get('window').height*0.4}
          yAxisLabel=""
          chartConfig={chartConfig}
          fromZero={true}
          showValuesOnTopOfBars={true}
        />
        <View style={{flexDirection:'row'}}>
          {conta!=0&&(<Pressable onPress={indietro} style={styles.button}>
            <Text>{"<- INDIETRO"}</Text>
          </Pressable>)}
          {conta!=dati.length-1&&(<Pressable onPress={avanti} style={styles.button}>
            <Text>{"AVANTI ->"} </Text>
          </Pressable>)}
        </View>
      </View>
    );
  }
  else{
    return(
    <View style={styles.centered}>
      <Image source={require('../assets/loading.gif')} style={{width: 100, height: 100 }}/>
    </View>
    );
  }
}

export default BarChartView;

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
    marginBottom: 30,
    borderWidth:1,
    borderRadius:50,
    paddingVertical:15,
    paddingHorizontal:30,
    backgroundColor:"#e0ffff",
  },
  button: {
    textAlign:'center',
    alignItems:'center',
    backgroundColor: 'lightblue',
    justifyContent:'center',
    width:100,
    marginTop: 40,
    marginHorizontal:15,
    padding:5,
    borderWidth: 1,
    borderRadius:10
  },
  grafico:{
    borderWidth:2,
    borderRadius:10,
    borderColor:'blue',
    padding:2,
  }
});