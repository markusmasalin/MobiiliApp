import React, { useState, useReducer, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList, AsyncStorage } from 'react-native';


function App() {
  const [result, setResult] = useState(0);
  const [guess, setGuess] = useState('');
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('');
  const [score, setScore] = useState(0);


  const startTheGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setResult(randomNumber)
    setCounter(0)
    setText('')
  }

  const makeTheGuess = async () => {
      if (parseInt(guess) < result){
        setText('Your guess ' + guess + ' is too low')
        setCounter(counter + 1);
      } 
  
      if (parseInt(guess) > result) {
        setText('Your guess ' + guess + ' is too high')
        setCounter(counter + 1);
      } 
      if (parseInt(guess) === result) {
        Alert.alert('Congratulation! You guessed the number in ' + counter + ' guesses')
        setGuess('')
        try {
          let highscore = await AsyncStorage.getItem('highScore');
          console.log( (highscore), 'reading the highscore')
          if (highscore === null) {
            let hs = await AsyncStorage.setItem('highScore', counter.toString());
            console.log(hs, 'value, highscore is null')
            setScore(counter)
          } 
          if ( highscore > counter ) {
            let hs = await AsyncStorage.setItem('highScore', counter.toString());
            console.log(hs, ' highscore is higher than counter')
            setScore(counter)
          } 
          if ( highscore < counter ) {
            console.log('highscore is lower')
          } 
          if ( highscore === counter ) {
            console.log('highscore is the same as your result')
          } 
        } catch (error) {
          Alert.alert('Error reading data');
        }
     
        
        
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
       {text}
      </Text>
      <TextInput
        style={styles.inputStyle}
        keyboardType={'numeric'}
        onChangeText={num => setGuess(num)}
        value={guess}
      />
      
      
    </View>
    <View style={styles.inputBox}>
      <View style={styles.buttonBox}>
          <Button title="Start the Game" onPress={startTheGame}  />
          <Button title="Make Guess" onPress={makeTheGuess} />
         
      </View>
      
    
    </View>
   
  
  
    <View style={styles.inputBox}>
     <Text>
       Highscore is {score} attempts
     </Text>
    
    </View>

    </View>
  
  );
}



export default App;