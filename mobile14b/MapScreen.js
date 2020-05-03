import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function  MapScreen({ route, navigation })  {
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

    const { data } = route.params
    return (
        <View style={styles.container}>
           <MapView
                style={styles.map} 
                region={{
                    latitude: data.lat,
                    longitude: data.lng,
                    latitudeDelta: 0.0644,
                    longitudeDelta: 0.0442,
                }}>
                
                <MapView.Marker key={data.id} 
                    coordinate={{
                        latitude: data.lat,
                        longitude: data.lng
                    }}
                    title={data.marker}
                    
                    />
            
            </MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
     flex: 1,
    
   
    },
    map: {
     flex: 1,
     height: 100,
    
   }
    
   });
