import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { clearLocalNotification, setLocalNotification } from '../helpers/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  count: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey',
    marginBottom: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});


const Deck = (props) => {
  const cardCount = useSelector(state => state.decks[props.route.params.name].questions.length)
  
  const handleQuizStart = () => {
    props.navigation.navigate('Quiz', {'name': props.route.params.name})
    clearLocalNotification()
      .then(setLocalNotification());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {props.route.params.name} </Text>
      <Text style={styles.count}>{cardCount} {cardCount === 1 ? 'card' : 'cards'}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('New Card', {'name': props.route.params.name})}>
        <Text style={styles.buttonText}>New Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={cardCount === 0}
        style={styles.button}
        onPress={handleQuizStart}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Deck;