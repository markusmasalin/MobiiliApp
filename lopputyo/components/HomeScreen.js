import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Header, ListItem, Button, Card } from 'react-native-elements';
import ExerciseGridTile from './ExerciseGridTile'

const db = SQLite.openDatabase('proabi.db');

export default function HomeScreen({route, navigation }) {
  const [items, setItems] = useState([]);
  const [points, setPoints] = useState(0);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    let exercises = require('../assets/data/exercises.json');
    setItems(exercises)
    db.transaction(tx => {
      tx.executeSql('create table if not exists proabi (id integer primary key not null, name text, password text,  points number);');
    });
    updateList()
    
  }, []);

  const fetchUser = () => {
    const u = users.filter(n => {
      return (
        n.name === name && n.password === password  
      )
    })
    setUser(u[0])
    console.log(user, 'user')
  }
  console.log(users)
  // Save user
  const saveUser = () => {
    db.transaction(tx => {
        tx.executeSql('insert into proabi (name, password, points) values (?, ?, ?);', [name, password, points]);    
      }, null, updateList
    )
  }
  
  // Update userlist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from proabi;', [], (_, { rows }) =>
        setUsers(rows._array)
      ); 
    });
  }


  const logOut = (p) => {
    setPoints(p)
    console.log(points)
  }

  const givePoints = () => {
    setPoints(user.points + data.points)
    console.log(user)
    db.transaction(
      tx => {
        tx.executeSql(`update from proabi set points values(?) where id = ?;`, [points, user.id]);
      }, null, updateList
    )    
  }
  
  // Delete user
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from proabi where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  if(!user || user === null) {
    return(
    <View style={styles.container}>
      <Text style={styles.title}>
        LOGIN
      </Text>
      <Input placeholder='Name' label='NAME'
          onChangeText={a => setName(a)}
          value={name}
          />
      <Input placeholder='Password' label='PASSWORD'
          onChangeText={a => setPassword(a)}
          value={password}
          secureTextEntry={true}
          />
      <Button raised icon={{name: 'save'}} onPress={fetchUser}
      title="LOGIN" />
      <Text style={styles.title}>
        Sign Up
      </Text>
       <Button raised icon={{name: 'save'}} onPress={saveUser}
      title="SAVE USER" />
    </View>
    )
  }
    
  const renderGridItem = itemData => {
    return ( 
      <ExerciseGridTile
        title={itemData.item.exerciseHeader}
        color={itemData.item.color}
        onSelect={() => navigation.navigate('Exercise', {data: itemData.item})}
      />
    );
  };
  
  return (
  <View style={styles.container}>
    <Header 
      centerComponent={{ text: 'ProAbi', style: { fontSize: 30, color: '#fff' } }} 
      rightComponent={{ icon: 'home', color: '#fff'  }}
      />
    <View >
      
      <View>
        <FlatList data={items} keyExtractor={item => item.id} renderItem={renderGridItem} numColumns={2} />
        <Button style={styles.title} title="Profile" onPress={() => navigation.navigate('Profile', {data: user})} />
        <Button style={styles.title} title="Log Out" onPress={() => logOut()} />
      </View>
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
