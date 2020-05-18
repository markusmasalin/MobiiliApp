import React, { useState, Component } from 'react';
import { StyleSheet, Header,Text, View, Button, TextInput, Alert, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, Assets } from '@react-navigation/stack';

import Exercise from './components/Exercise'
import HomeScreen from './components/HomeScreen';
import Profile from './components/Profile';
import * as SQLite from 'expo-sqlite';


const Stack = createStackNavigator();


export default function App() {  

  return (
  <NavigationContainer> 
    
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  </NavigationContainer>
   
  );


}




