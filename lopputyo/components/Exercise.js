import React, {  useState, Component, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { CheckBox, ListItem, ButtonGroup, Header } from 'react-native-elements'



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

export default function Exercise ({ route, navigation }) {
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({})
    const [headline, setHeadline] = useState('')
    const [counter, setCounter] = useState(0)
    const [points, setPoints] = useState(0)
    const [user, setUser] = useState({})
   
    useEffect(() => {
        console.log(route.params, 'routeparams')
        console.log(route.params.user, 'user')
        const { data } = route.params
        const {u} = route.params.user
        console.log(u, 'u')
    //    let exercises = require('../assets/data/exercises.json');
        setQuestions(data.items)
        setQuestion(data.items[0])
        setHeadline(data.exerciseHeader)
        setUser(route.params.user)
        console.log(user, 'user in Exercise')
        Alert.alert(
            data.exerciseHeader, 
            data.exerciseIntro,
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
          );
    }, []);

    const checkTheAnswer = (item) => {
        let p = user.points
        if (item.value === true) {
            setPoints(points +1) 
            console.log(user.points, 'points before')
            setUser({...user, points: p +1})
            Alert.alert(
                "Congratulation",
                "Your answer is right",
                [
                  { text: "OK", onPress: () => nextRound() }
                    ],
                    { cancelable: false }
              );   
           
        } else {
            Alert.alert(
                "Sorry, :(",
                "Your answer is wrong",
                [
                  { text: "OK", onPress: () => nextRound() }
                    ],
                    { cancelable: false }
              )   
        }
    }

    const nextRound = () => {
        if( counter < questions.length -1) {
            let count = counter +1
            setQuestion(questions[count])
            setCounter(count)
        } else {
            finalRound()
        }
    }
    
    const finalRound = () => { 
        let p = points
        Alert.alert(
            "That was the final question",
            "Your points are " + p + "/" + questions.length,
            [
              { text: "OK", onPress: () => navigation.navigate('Home', {data: user})}
                ],
                { cancelable: false }
          );  
    }

    return (
        <View style={styles.container}>
            <Header 
            centerComponent={{ text: 'ProAbi', style: { fontSize: 30, color: '#fff' } }} 
            rightComponent={{ text: headline, color: '#fff'  }}
            />
            <View style={styles.textScreen}>
                <Text style={styles.headline}>
                    {question.exerciseTag} 

                </Text>
                <Text>
                    {question.text}
                </Text>
                <Text style={styles.question}>
                    Question: 
                   
                </Text>
                <Text style={styles.question}>
                   
                    {question.question}
                </Text>
            </View>
            <View style={styles.flatlistContainer}>
                <FlatList    
                    keyExtractor={item => item.id}
                    data={question.options}
                    renderItem={({item}) => 
                    <ListItem
                        style={styles.listcontainer} 
                        title={item.text}
                        rightTitle={
                            <View>
                            <Button style={{fontSize: 18, color: 'grey'}} title='Choose' onPress={() => checkTheAnswer(item)} />
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
}

const styles = StyleSheet.create({
    textScreen: {
        margin: '5%',
        padding: 3,
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flatlistContainer: {
        flex: 2,
      },
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
        },
    question: {
        fontSize: 19, 
        padding: 1,
    },
    headline: {
        fontSize: 20,
        color: 'red'
    }
});


