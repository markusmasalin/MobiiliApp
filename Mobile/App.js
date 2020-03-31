import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


function App() {
  
  const [result, setResult] = useState(0);
  const [integer1, setInteger1] = useState(0);
  const [integer2, setInteger2] = useState(0);
  
  const doTheSum = () => {
   
    setResult(integer1+integer2)
    }
    
  const doTheSubtrack = () => {
    setResult(integer1-integer2)
    }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonBox: {
      flex: 1, 
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
     <View style={styles.inputBox} > 
      <Text>
       Result: {result}
      </Text>
      <TextInput
        style={styles.inputStyle}
        keyboardType={'numeric'}
        onChangeText={text => setInteger1(parseInt(text))}
        
        value={integer1}
      />
      <TextInput
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        keyboardType={'numeric'}
        onChangeText={text => setInteger2(parseInt(text))}
        
        value={integer2}
      />
        
      </View>
    <View style={styles.buttonBox}>
      <Button title="+" onPress={doTheSum}  />
      <Button title="-" onPress={doTheSubtrack} />
       
    </View>
    <View style={styles.buttonBox}>
      
    </View>
    </View>
  
  );
}





export default App;