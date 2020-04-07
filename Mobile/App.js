import React, { useState, useReducer, Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, FlatList } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import {createStackNavigator} from 'react-navigation-stack'
// import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import HomeScreen from './HomeScreen';
import GoalItem from './GoalItem';

/*
const AppNavigator =  createStackNavigator({
  Home: {screen: HomeScreen},
  Settings: {screen: SettingScreen}
  });
  const AppContainer = createAppContainer(AppNavigator);
*/

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);
 
//  const [integer2, setInteger2] = useState('');

  

  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle}
    ])
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    })
  }
  
    
  const styles = StyleSheet.create({
    listItem: {
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#ccc',
      borderColor: 'black'
    },
    screen: {
      padding: 50
    }
  });

  return (
   <View style={styles.screen}>
     
    <HomeScreen
      onAddGoal={addGoalHandler} />
    <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
        <GoalItem 
        id={itemData.item.id} 
        onDelete={removeGoalHandler} 
         title={itemData.item.value}
         /> 
        )}
       
      />

    </View>  
  );
}


export default App;