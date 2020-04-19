import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, Picker } from 'react-native';

export default function App() {
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [rate, setRate] = useState(0);
  const [selectedValue, setSelectedValue] = useState('')


  useEffect(() => {
    const url = 'http://data.fixer.io/api/latest?access_key=37d36c01df9dbad629c0bcfd3e371e9c&base=eur';
    const picture = 'http://data.fixer.io/api/symbols?access_key=37d36c01df9dbad629c0bcfd3e371e9c';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setCurrencies(responseJson.rates);
       const r = Object.keys(responseJson.rates).map(k => k)
       setCountries(r)
    
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    });
    fetch(picture)
    .then((response) => response.json())
    .then((responseJson) => { 
       console.log(responseJson, 'pictures');
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    });
  }, []);

  console.log(currencies, 'currency')
  console.log(countries, 'countries')
  

  const getRates = () => {
    const v = countries[selectedValue]
    const r = currencies[v]
    console.log(r, 'rate')
    const sum = Number(amount) / Number(r)
    console.log(sum, 'sum')
    setRate(Math.round(sum * 1000) / 1000)
    
    
  }
  
  

  return (
    <View style={styles.container}>
      <Text>
        {rate} €
      </Text>
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={amount} 
        placeholder="amount"
        onChangeText={(a) => setAmount(a)} 
      />
      <Picker
        selectedValue={selectedValue}
        style={{width: 50}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {countries.map((item, index) => {
        return (<Picker.Item label={item} value={index} key={index}/>) 
    })}
      </Picker>
     
      
     <Button title="Convert" onPress={getRates} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 tinyImage: {

  height: 50,
},
});