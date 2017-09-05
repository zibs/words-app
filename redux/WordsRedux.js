import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getWordsRequest: null,
  getWordsSuccess: ['words'],
  getWordsFailure: ['errorMessage'],

  getWordRequest: ['word'],
  getWordSuccess: ['word'],
  getWordFailure: ['errorMessage']
})

export const WordsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  words: [],
  word: {}
})

/* ------------- Reducers ------------- */

// request the avatar for a user
export const requestWords = (state, action) => state.merge({ fetching: true })
export const requestWord = (state, action) => state.merge({ fetching: true })

// successful avatar lookup
export const successWords = (state, action) => {
  const { words } = action
  return state.merge({ fetching: false, error: null, words: words.words, count: words.count })
}
export const successWord = (state, action) => {
  const { word } = action
  return state.merge({ fetching: false, error: null, word })
}

// failed to get the avatar
export const failure = (state, { errorMessage }) => state.merge({ fetching: false, errorMessage })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_WORDS_REQUEST]: requestWords,
  [Types.GET_WORDS_SUCCESS]: successWords,
  [Types.GET_WORDS_FAILURE]: failure,

  [Types.GET_WORD_REQUEST]: requestWord,
  [Types.GET_WORD_SUCCESS]: successWord,
  [Types.GET_WORD_FAILURE]: failure
})
