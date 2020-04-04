import React, { useState, useReducer, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';


function App() {
  const [data, setData] = useState('');
  const [integer1, setInteger1] = useState(0);
  const [integer2, setInteger2] = useState(0);


  const doTheSum = () => {
    const summa = integer1+integer2  
    const teksti = (`Result: ${summa}`);
    setData(teksti);
    
    }

  const doTheSubtrack = () => {
    const summa = integer1-integer2  
    const teksti = (`result: ${summa}`)
    setData(teksti);
    
    }

  
    
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      
    },
    inputBox: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
     
    inputStyle: {
      width: 200, 
      borderColor: 'gray', 
      borderWidth: 1
    }
  });

  return (
   <View style={styles.container}>
      
     <View style={styles.inputBox}>
     <Text>
       {data}
     </Text>
      <TextInput
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        keyboardType={'numeric'}
        onChangeText={num => setInteger1(parseInt(num))}
        value={integer1}
      />
      <TextInput
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        keyboardType={'numeric'}
        onChangeText={num => setInteger2(parseInt(num))}
        value={integer2}
      />
      
    </View>
    <View style={styles.inputBox}>
      <View style={styles.buttonBox}>
          <Button title="+" onPress={doTheSum}  />
          <Button title="-" onPress={doTheSubtrack} />
         
      </View>
      
    
    </View>
   
  
  
    <View style={styles.inputBox}>
    
    
    </View>

    </View>
  
  );
}





export default App;