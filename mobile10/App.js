import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([{
    
      lat: 60.200692,
      lng: 24.934302,
      name: 'Haaga-Helia'
    
  }])
  const [locations, setLocations] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0644,
    longitudeDelta: 0.0442,
  });
 
  useEffect(() => {
   
    
  
   
  }, []);

  console.log(locations, 'locations')
  console.log(markers, 'markers')
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
      fetchRestaurants()
      
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 

  }

  const fetchRestaurants = () => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locations.latitude},${locations.longitude}&radius=1500&type=restaurant&rankBy=distance&key=AIzaSyBZKh8IFdv53AGC6O-zHc2pFyNIp6ruZ8Y`)
    .then((response) => response.json())
    .then((responseJson) => { 
      console.log(responseJson, 'responseJson')
      let markerList = responseJson.results.map(o => {
       
        let object = {}
        object['name'] = o.name
        object['lat'] = Number(o.geometry.location.lat)
        object['lng'] = Number(o.geometry.location.lng)
        return object
        
        
        
       
    })
    setMarkers(markerList)
      
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
        {markers.map((marker, index) => (
          <MapView.Marker key={index} 
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng
          }}
          title={marker.name}
          description={marker.name}
          />
        ))}
        
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