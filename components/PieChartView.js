// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,Image,Pressable,Dimensions
} from 'react-native';
import {PieChart} from "react-native-chart-kit";

const PieChartView:React.FC=(props)=>{

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

  const popolaGrafici = (datas) => {
    const vet=[];
    for(var i=0;i<datas.length;i++){
      const record=[];
      const ogg1 = {
        name: datas[i].Risposta_1,
        population:datas[i].Num_R1,
        color: "red",
        legendFontColor: "red",
        legendFontSize: 15
      };
      const ogg2 = {
        name: datas[i].Risposta_2,
        population:datas[i].Num_R2,
        color: "blue",
        legendFontColor: "blue",
        legendFontSize: 15
      };
      const ogg3 = {
        name: datas[i].Risposta_3,
        population:datas[i].Num_R3,
        color: "green",
        legendFontColor: "green",
        legendFontSize: 15
      };
      const ogg4 = {
        name: datas[i].Risposta_4,
        population:datas[i].Num_R4,
        color: "grey",
        legendFontColor: "grey",
        legendFontSize: 15
      };
      record.push(ogg1);
      record.push(ogg2);
      record.push(ogg3);
      record.push(ogg4);
      const oggettoFinale={record};
      vet.push(oggettoFinale);
    }
    setDati(vet);
  };

  const prelevaStatistiche = async () => {
      try {
        if(dati.length==0){
          const response = await fetch(
            'https://script.google.com/macros/s/AKfycbyNCc8dfydRUPWluNq0JQni0TcxnNpsiM7SBZ2AArMi3M-9dPZ1/exec?action=getStatistiche'
          ); 
          const json = await response.json();
          popolaGrafici(json);
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

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
  };

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
if(dati.length!=0){
      return(
        <View style={styles.centered}>
          <Text style={styles.title}>{domande[conta]}</Text>
          <PieChart
            style={styles.grafico}
            data={dati[conta].record}
            width={Dimensions.get('window').width*0.95}
            height={Dimensions.get('window').height*0.4}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
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

export default PieChartView;

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
  }
});