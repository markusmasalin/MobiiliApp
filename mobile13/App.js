import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Header, ListItem } from 'react-native-elements';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

useEffect(() => {
  db.transaction(tx => {
    tx.executeSql('create table if not exists shoppingList (id integer primary key not null, product text, amount text);');
  });
  updateList();    
}, []);

console.log(items)

// Save course
const saveItem = () => {
  db.transaction(tx => {
      tx.executeSql('insert into shoppingList (product, amount) values (?, ?);', [product, amount]);    
    }, null, updateList
  )
}

// Update courselist
const updateList = () => {
  db.transaction(tx => {
    tx.executeSql('select * from shoppingList;', [], (_, { rows }) =>
      setItems(rows._array)
    ); 
  });
}

// Delete course
const deleteItem = (id) => {
  db.transaction(
    tx => {
      tx.executeSql(`delete from shoppingList where id = ?;`, [id]);
    }, null, updateList
  )    
}

const listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
};


return (
  <View style={styles.container}>
    <Header
     
      centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
    
    />
    <Input placeholder='Product' label='PRODUCT'
      onChangeText={p => setProduct(p)}
      value={product}
    />
    <Input placeholder='Amount' label='AMOUNT'
      onChangeText={a => setAmount(a)}
      value={amount}
    />
      <Button raised icon={{name: 'save'}} onPress={saveItem}
      title="SAVE" />

    
    <FlatList
      
      keyExtractor={item => item.id.toString()} 
      data={items}
      renderItem={({item}) => 
        <ListItem
        style={styles.listcontainer} 
          title={item.product}
          subtitle={
            <View style={styles.subtitleView}>
             <Text style={styles.ratingText} >{item.amount} </Text>
            </View>
          }
          rightTitle={
            <View>
              <Text style={{fontSize: 18, color: 'grey'}} onPress={() => deleteItem(item.id)}>Bought</Text>
            </View>
          }
          bottomDivider

        
        />
      
      }
      ItemSeparatorComponent={listSeparator} 
    />

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 1,
    color: 'grey'
  }
});
