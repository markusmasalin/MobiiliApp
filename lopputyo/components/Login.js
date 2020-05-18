import React, {  useState, Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, input } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, CheckBox, ListItem, ButtonGroup, Header } from 'react-native-elements'


export default function Login() {

  const givePoints = () => {

    const points = data.points + 1
    console.log(points, 'points at the start')
    console.log(points, 'points')
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
                marginTop: '20%',
                flex: 2,
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
            <Input placeholder='Name' label='NAME'
                onChangeText={a => setUser(a)}
                value={address}
                />
            <Button raised icon={{name: 'save'}} onPress={fetchAddress}
            title="SAVE" />
        </View>
        
        );


};