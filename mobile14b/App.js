import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import * as SQLite from 'expo-sqlite';

const Stack = createStackNavigator();

function App() {

    
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
  <NavigationContainer> 
    <Stack.Navigator>
      <Stack.Screen name="My places" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  </NavigationContainer>
   
  );
}





export default App;