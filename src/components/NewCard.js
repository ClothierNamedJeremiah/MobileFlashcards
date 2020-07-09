import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { handleAddCard } from '../actions/decks'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});

const NewCard = (props) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { dispatch } = useStore();

  const { navigation, route } = props;

  const handleSubmit = () => {
    if (question === '' || answer === '') {
      alert('Please provide input for all of the available fields.');
    } else {
      dispatch(handleAddCard(route.params.name, question, answer));
      setQuestion('');
      setAnswer('');
      navigation.pop();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Question'
          value={question}
          onChangeText={text => setQuestion(text)}
        />
        <TextInput
          style={[styles.textInput, {borderTopWidth: 0}]}
          placeholder='Answer'
          value={answer}
          onChangeText={text => setAnswer(text)}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewCard;