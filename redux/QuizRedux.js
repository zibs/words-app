import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getRandomWordRequest: null,
  getRandomWordSuccess: ['word'],
  getRandomWordFailure: ['errorMessage'],
  revealDefinition: false,
  resetRandomWord: null
})

export const QuizTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  randomWord: {},
  taps: 0,
  revealed: false,
  startedFetch: null
})

/* ------------- Reducers ------------- */

export const requestWord = (state, action) => state.merge({ fetching: true, startedFetch: Date.now() })
// successful avatar lookup
export const successWord = (state, action) => {
  const { word } = action
  return state.merge({ fetching: false, error: null, randomWord: word })
}
// failed to get the avatar
export const failure = (state, { errorMessage }) => state.merge({ fetching: false, errorMessage })
export const reveal = (state, action) => state.merge({ revealed: true, taps: state.taps + 1 })
export const reset = (state, action) => state.merge({ revealed: false, randomWord: {}, fetching: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RANDOM_WORD_REQUEST]: requestWord,
  [Types.GET_RANDOM_WORD_SUCCESS]: successWord,
  [Types.GET_RANDOM_WORD_FAILURE]: failure,
  [Types.RESET_RANDOM_WORD]: reset,
  [Types.REVEAL_DEFINITION]: reveal
})
