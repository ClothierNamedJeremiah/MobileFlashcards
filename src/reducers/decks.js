import { ADD_DECK, ADD_CARD } from "../actions/decks";

export const decks = (state = {}, action) => {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.name]: {
          name: action.name,
          questions: action.questions,
        }
      }
    case ADD_CARD:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          questions: state[action.name].questions.concat({
            question: action.question,
            answer: action.answer,
          }),
        }
      }
    default:
      return state;
  }
}