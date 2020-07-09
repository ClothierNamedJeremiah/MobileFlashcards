import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import QuizResults from './QuizResults'

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
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
})

const Quiz = (props) => {
  const { navigation, route } = props;
  
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState(0);
  const [viewFront, setViewFront] = useState(true);
  
  const questions = useSelector(state => state.decks[route.params.name].questions)

  const handleGuess = (choice) => {
    // get input text and compare to selected value
    if (choice) {
        setCorrect(correct + 1);
    }

    // increment question counter and reset input field
    setIdx(idx + 1);
    setGuess('');
  }

  const handleQuizRestart = () => {
    setIdx(0);
    setCorrect(0);
  }

  const handleBackToDeck = () => {
    navigation.pop();
  }

  // Case: All questions have been answered
  if (idx === questions.length) {
    return <QuizResults correct={correct} total={questions.length} handleQuizRestart={handleQuizRestart} handleBackToDeck={handleBackToDeck}/>
  }

  return (
    <View>
      <Text style={styles.header}>Question {idx+1}/{questions.length}</Text>
      
      {viewFront 
      ? <View>
        <Text style={styles.question}>{questions[idx].question}</Text>
          <TextInput
              style={[styles.textInput, {borderTopWidth: 0}]}
              placeholder='Guess'
              value={guess}
              onChangeText={text => setGuess(text)}
            />
          <TouchableOpacity style={[styles.button, {backgroundColor: '#33cc33', borderColor: '#33cc33'}]} onPress={() => handleGuess(true)}>
            <Text style={styles.buttonText}>
              Correct
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#ff0033', borderColor: '#ff0033'}]} onPress={() => handleGuess(false)}>
            <Text style={styles.buttonText}>
              Incorrect
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setViewFront(false)}>
            <Text style={styles.buttonText}>
              Show Answer
            </Text>
          </TouchableOpacity>
        </View>
      :
        <View>
        <Text style={styles.question}>{questions[idx].answer}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setViewFront(true)}>
              <Text style={styles.buttonText}>
                Show Question
              </Text>
            </TouchableOpacity>
        </View>
      }
      
    </View>
  );
};

export default Quiz;