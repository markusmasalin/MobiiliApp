import React, { useState, useReducer, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


function App() {
  
  const [result, setResult] = useState(0);
  const [guess, setGuess] = useState(0);
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('');
  
  
  const startTheGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setResult(randomNumber)
    setCounter(0)
    setText('')
    
    }
    
  const makeTheGuess = () => {
     

    if (guess < result){
     
      setText('Your guess ' + guess + ' is too low')
      setCounter(counter + 1);
    } 
    
    if (guess > result) {
     
      setText('Your guess ' + guess + ' is too high')
      setCounter(counter + 1);
    } 
    if (guess === result) {
      Alert.alert('Congratulation! You guessed the number in ' + counter + ' guesses')
      setGuess(0)

    }  
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
        {text}
       
      </Text>
     
      <TextInput
        style={styles.inputStyle}
        keyboardType={'numeric'}
        onChangeText={e => setGuess(parseInt(e))}
        value={guess}
      />
      
        
      </View>
    <View style={styles.buttonBox}>
      <Button title="Start the Game" onPress={startTheGame}  />
      <Button title="Make Guess" onPress={makeTheGuess} />
       
    </View>
    <View style={styles.buttonBox}>
      
    </View>
    </View>
  
  );
}





export default App;