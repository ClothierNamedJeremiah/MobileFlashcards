import { AsyncStorage } from 'react-native';

export const addDeck = async (name) => {
  try {
    await AsyncStorage.setItem(name, JSON.stringify({
      name,
      questions: [],
    }));
  } catch (error) {
    console.log('Error Adding Deck: ', error);
  }
}

export const getDecks = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return Promise.all(keys.map(key => AsyncStorage.getItem(key)));
  } catch (error) {
    console.log('Error Retrieving Decks: ', error);
  }
}

export const getDeck = async (name) => {
  try {
    const json =  await AsyncStorage.getItem(name);
    return JSON.parse(json);
  } catch (error) {
    console.log('Error Retrieving Deck: ', error);
  }
}

export const addCard = async (name, question, answer) => {
  console.log(`${name}, ${question}, ${answer}`)
  try {
    const json = await AsyncStorage.getItem(name);
    const deck = JSON.parse(json);
    deck.questions.push({question, answer});
    await AsyncStorage.mergeItem(name, JSON.stringify(deck));
  } catch (error) {
    console.log('Error Adding Card: ', error);
  }
}

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
}