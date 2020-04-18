import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');

  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i='+ ingredient + '&p=3';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipes(responseJson.results);
    })
    .catch((error) => { 
      Alert.alert('Error' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList 
        style={{marginTop : "10%"}}
        keyExtractor={item => item.href} 
        renderItem={({item}) => 
          <View> 
            <Text>{item.title} </Text> 
            <Image
              source={{uri: item.thumbnail}}
              style={{width:50, height: 50}}
             > 
            </Image>
          </View> } 
        ItemSeparatorComponent={listSeparator}
        data={recipes} 
      />  
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={ingredient} 
        placeholder="Ingredient"
        onChangeText={(recipe) => setIngredient(recipe)} 
      />
      
     <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 tinyImage: {

  height: 50,
},
});