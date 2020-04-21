import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
 
  useEffect(() => {
   
    
  
   
  }, []);

  console.log(locations, 'locations')
  const fetchAddress = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=9ktigSO6qu32wscTGAj5zfEdCDBT6Jdg&location=${address}`)
    .then((response) => response.json())
    .then((responseJson) => { 
      const lat = responseJson.results[0].locations[0].latLng.lat 
      const lng = responseJson.results[0].locations[0].latLng.lng
     
      const latNumber = Number(lat)
      const lngNumber = Number(lng)
    
      const fetchedObject = ({...locations, latitude: latNumber, longitude: lngNumber })
      setLocations(fetchedObject)
      
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 

  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map} 
        region={locations}>
        <Marker
          coordinate={{
            latitude: locations.latitude,
            longitude: locations.longitude
          }}
          title='Haaga-Helia' 
          />
      </MapView>
      <View>
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={address} 
        placeholder="Address"
        onChangeText={(ad) => setAddress(ad)} 
      />
      
     <Button title="Show" onPress={fetchAddress} />
      </View>
      
    </View>

  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
 

 },
 map: {
  flex: 1,
  height: 100,
 
}
 
});