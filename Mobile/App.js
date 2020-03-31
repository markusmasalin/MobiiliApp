import React, { useState, useReducer, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';


function App() {
  
  const [data, setData] = useState([]);
  const [text, setText] = useState('');
  
  
  const itemAdded = () => {
    setData([...data, {key: text}]);
    setText('')
    }
  

  const listCleared = () => {
    setData([]);
    setText('')

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
          Shopping list
        </Text>
      </View>
     <View style={styles.inputBox}>
     
      <View style={styles.buttonBox}>
        <Button title="Add" onPress={itemAdded}  />
        <Button title="Clear" onPress={listCleared}  />
      </View>
      
      <TextInput
        style={styles.inputStyle}
        onChangeText={text => setText(text)}
        value={text}
      /> 
      <FlatList 
          data={data}
          renderItem={({item}) => 
            <Text>{item.key}</Text>
          }
        />
    </View>
    
    <View style={styles.inputStyle}>
      
    </View>
    
    </View>
  
  );
}





export default App;