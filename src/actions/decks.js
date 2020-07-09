export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

import * as API from '../helpers/api'

const addDeck = ({name, questions=[]}) => {
  return {
    type: ADD_DECK,
    name,
    questions,
  }
}

const addCard = (name, question, answer) => {
  return {
    type: ADD_CARD,
    name,
    question,
    answer,
  }
}

export const handleAddCard = (name, question, answer) => {
  return (dispatch) => {
    API.addCard(name, question, answer);
    dispatch(addCard(name, question, answer));
  }
}

export const handleAddDeck = (name) => {
  return (dispatch) => {
    API.addDeck(name);
    dispatch(addDeck({name}));
  }
}

export const handleInitialData = () => {
  return (dispatch) => {
    API.getDecks()
      .then(decks => {
        decks.forEach(deck => 
          dispatch(addDeck(JSON.parse(deck))));
      });
  }
}