import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet  } from 'react-native';



const HomeScreen = props => {
    const [enteredGoal, setEnteredGoal] = useState('')

    const inputHandler = enteredGoal => {
        setEnteredGoal(enteredGoal)
      }

    return (
        <View style={styles.inputContainer}>
            <TextInput
             placehodelr="Course goals"
             style={styles.input}
             onChangeText={inputHandler}
             value={enteredGoal}
             />
            <Button title="add" onPress={() => props.onAddGoal(enteredGoal)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    
    input: {
        width: '80%',
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


});
export default  HomeScreen;
   
    
    
