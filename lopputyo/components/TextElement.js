import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';


const TextElement = props => {

    return <Text style={{...styles.textElement, ...props.style}} />

}; 
const styles = StyleSheet.create({
    textElement: {
        borderColor: 'grey',
        margin: 5
    }
});

export default TextElement;