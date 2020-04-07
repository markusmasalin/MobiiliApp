import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';


export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [integer1, setInteger1] = useState('');
  const [integer2, setInteger2] = useState('');

  const doTheSum = () => {
    const summa = parseInt(integer1)+ parseInt(integer2)  
    const teksti = (`${integer1} + ${integer2} = ${summa}`);
    setData([...data, {key: teksti}]);
    
    }

  const doTheSubtrack = () => {
    const summa = parseInt(integer1)- parseInt(integer2)  
    const teksti = (`${integer1} - ${integer2} = ${summa}`)
    setData([...data, {key: teksti}]);
    
    }

  const listCleared = () => {
    setData([]);
    
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: '10%',
      flex: 1,
    
     
     
    },
    buttonBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      
    },
    inputBox: {
      
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
     
    inputStyle: {
      width: 200, 
     
      borderWidth: 1
    }
  });

return (
<View style={styles.container}>
      
      <View style={styles.inputBox}>
       <TextInput
         style={{width: 200, borderColor: 'gray', borderWidth: 1}}
         keyboardType={'numeric'}
         onChangeText={num => setInteger1(num)}
         value={integer1}
       />
       <TextInput
         style={{width: 200, borderColor: 'gray', borderWidth: 1}}
         keyboardType={'numeric'}
         onChangeText={num => setInteger2(num)}
         value={integer2}
       />
       <View style={styles.buttonBox}>
          <Button title="+" onPress={doTheSum}  />
          <Button title="-" onPress={doTheSubtrack} />
          <Button
        title="History"
        onPress={() => navigation.navigate('History', {data: data})}
        />
      </View>
       

    </View>

  

</View>
);
};