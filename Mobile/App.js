import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';




export default function App() {
  
  const [result, setResult] = useState(0);
  const [integer1, setInteger1] = useState(0);
  const [integer2, setInteger2] = useState(0);

  
  const doTheSum = () => {
   
    Alert.alert(integer1+integer2);
    Alert.alert('hello');
    }
    
  const doTheSubtrack = () => {
    
      Alert.alert(integer2);
    }


  return (
   <View style={styles.container}>
     <View style={styles.inputBox} > 
      <Text>
       Result: {result}
      </Text>
      <TextInput
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        type={'number'}
        keyboardType={'numeric'} 
        onChangeText={num => setInteger1(num)}
        value={integer1}
        />
      <TextInput
      style={{width: 200, borderColor: 'gray', borderWidth: 1}}
      type={'number'}
      keyboardType={'numeric'} 
      onChangeText={num => setInteger2(num)}
      value={integer2}
      />
        
      </View>
    <View style={styles.buttonBox}>
      <Button title="Button1" onPress={doTheSum}/>
      <Button title="Button2" onPress={doTheSubtrack}/>
       
    </View>
    <View style={styles.buttonBox}>
      
    </View>
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
  buttonBox: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  inputBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
