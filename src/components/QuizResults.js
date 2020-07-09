import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { handleAddCard } from '../actions/decks'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  labelText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
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

const QuizResults = (props) => {
  const { correct, total, handleBackToDeck, handleQuizRestart} = props;
  const accuracy = correct/total;

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Total Questions {total}</Text>
      <Text style={styles.labelText}>Correct Responses {correct}</Text>
      <Text style={styles.labelText}>Accuracy {(accuracy*100).toFixed(2)}%</Text>
      <Text style={styles.labelText}></Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToDeck}>
        <Text style={styles.buttonText}>
          Back to Deck
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleQuizRestart}>
        <Text style={styles.buttonText}>
          Restart Quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizResults;