// Importazione delle componenti necessarie
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { RadioButtonGroup, RadioButtonItem } from 'expo-radio-button';

const Sondaggio: React.FC = (props) => {
  const [risposta, setRisposta] = useState('');
  const [domanda, setDomanda] = useState('');
  const [ris1, setRis1] = useState('');
  const [ris2, setRis2] = useState('');
  const [ris3, setRis3] = useState('');
  const [ris4, setRis4] = useState('');
  const [conta, setConta] = useState(0);
  const [data, setData] = useState([]);
  const [end, setEnd] = useState(false);
  const [invio, setInvio] = useState(false);

}