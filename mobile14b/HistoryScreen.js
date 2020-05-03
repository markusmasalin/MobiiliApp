import React, {  useState, Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {

  const { data } = route.params

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
          <View style={styles.inputBox}>
          <Text>
              History
          </Text>
          <FlatList 
                data={data}
                renderItem={({item}) => 
                <Text>{item.key}</Text>
                }
                keyExtractor={(item, index) => index.toString()}
          />
          </View>
        </View>
        
        );


};