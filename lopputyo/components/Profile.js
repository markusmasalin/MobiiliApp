import React, {  useState, Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { CheckBox, ListItem, ButtonGroup, Header } from 'react-native-elements'


export default function Profile({ route, navigation }) {

  const { data } = route.params

  console.log(data)

  

return (
        <View style={styles.container}>
           <Header 
                centerComponent={{ text: 'ProAbi', style: { fontSize: 30, color: '#fff' } }} 
                rightComponent={{ icon: 'home', color: '#fff'  }}
                />
          <View style={styles.gridItemStyle}>
        
          <Text style={styles.title}>
             name:  {data.name}
          </Text>
          <Text style={styles.title}>
             points:  {data.points}
          </Text>
          </View>
        </View>
        
        );


};
const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        gridItemStyle: {
          flex: 1,
          margin: 15,
          height: 150
        },
      
        title: {
          fontSize: 30,
          marginVertical: 20,
          padding: 20
        },
      });