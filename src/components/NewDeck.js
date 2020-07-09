import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import { handleAddDeck } from '../actions/decks'

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
  formContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
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

const NewDeck = ({navigation}) => {
  const [name, setName] = useState('');
  const { getState, dispatch } = useStore();

  const handleSubmit = () => {
    if (name === '') {
      alert('Please provide a name before submitting.');
    } else if (getState().decks.hasOwnProperty(name)) {
      alert('Duplicate deck name, please provide a new name.');
    } else {
      dispatch(handleAddDeck(name));
      setName('');
      navigation.navigate('Deck', {name});
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Deck</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Name'
          value={name}
          onChangeText={text => setName(text)}
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

export default NewDeck;