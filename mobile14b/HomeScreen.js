import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Header, ListItem } from 'react-native-elements';


const db = SQLite.openDatabase('maplistdb.db');

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState([{    
        lat: 60.200692,
        lng: 24.934302,
        name: 'Haaga-Helia'
    }]);
    const [locations, setLocations] = useState({
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.0644,
      longitudeDelta: 0.0442,
    });
  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists mapList (id integer primary key not null, marker text, lat number, lng number);');
    });
    updateList();    
  }, []);
  
  console.log(items, 'items')

  const fetchAddress = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=9ktigSO6qu32wscTGAj5zfEdCDBT6Jdg&location=${address}`)
    .then((response) => response.json())
    .then((responseJson) => { 
      const lat = responseJson.results[0].locations[0].latLng.lat 
      const lng = responseJson.results[0].locations[0].latLng.lng
      const latNumber = Number(lat)
      setLatitude(latNumber)
      const lngNumber = Number(lng)
      setLongitude(lngNumber)
      const fetchedObject = ({...locations, latitude: latNumber, longitude: lngNumber })
      setLocations(fetchedObject)
      saveItem()
            
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  
  }
  
  
  console.log(items)
  
  // Save course
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into mapList (marker, lat, lng) values (?, ?, ?);', [address, latitude, longitude]);    
      }, null, updateList
    )
  }
  
  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from mapList;', [], (_, { rows }) =>
        setItems(rows._array)
      ); 
    });
  }
  
  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from mapList where id = ?;`, [id]);
      }, null, updateList
    )    
  }


const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          marginLeft: "10%"
        }}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginTop: '10%',
      flex: 1,
    },
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingText: {
      paddingLeft: 1,
      color: 'grey'
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
    listcontainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
      },
     
    inputStyle: {
      width: 200, 
     
      borderWidth: 1
    }
  });

return (
<View style={styles.container}>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Input placeholder='Address' label='ADDRESS'
      onChangeText={a => setAddress(a)}
      value={address}
    />
      <Button raised icon={{name: 'save'}} onPress={fetchAddress}
      title="SAVE" />

    <FlatList    
      keyExtractor={item => item.id.toString()} 
      data={items}
      renderItem={({item}) => 
        <ListItem
        style={styles.listcontainer} 
          title={item.marker}
          rightTitle={
            <View>
              <Text style={{fontSize: 18, color: 'grey'}} onPress={() => navigation.navigate('Map', {data: item})}>Map</Text>
            </View>
          }
         
          bottomDivider
        />
      }
      ItemSeparatorComponent={listSeparator} 
    />
     

  </View>
         
</View>
       

);
};


