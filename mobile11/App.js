import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
 
  useEffect(() => {
   
    getLocation();
  
   
  }, []);

  const getLocation = async () => {
    //Check permission
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
    Alert.alert('No permission to access location');
    }
    else {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location, 'location')
    const fetchedObject = ({...location, latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0322,
      longitudeDelta: 0.0221 })
    setLocation(fetchedObject);
    }
    };

  console.log(location, 'locations')
  const fetchAddress = () => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=9ktigSO6qu32wscTGAj5zfEdCDBT6Jdg&location=${address}`)
    .then((response) => response.json())
    .then((responseJson) => { 
      const lat = responseJson.results[0].locations[0].latLng.lat 
      const lng = responseJson.results[0].locations[0].latLng.lng
     
      const latNumber = Number(lat)
      const lngNumber = Number(lng)
    
      const fetchedObject = ({latitude: latNumber, longitude: lngNumber,  latitudeDelta: 0.0322,
        longitudeDelta: 0.0221  })
      setLocation(fetchedObject)
      
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 

  }
  if(location === null) {
    return (
      <View>
        <Text>
          Loading...
        </Text>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map} 
        region={location}>
        
      </MapView>
      <View>
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={address} 
        placeholder="Address"
        onChangeText={(ad) => setAddress(ad)} 
      />
      
     <Button title="Show" onPress={fetchAddress} />
     <Button title="Location" onPress={getLocation} />
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