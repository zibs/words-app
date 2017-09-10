import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getStaticDataRequest: null,
  setColor: ['color']
  // getRandomWordSuccess: ['word'],
  // getRandomWordFailure: ['errorMessage']
})

export const StaticTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  colours: [
    'rgb(123, 86, 236)',
    'rgb(245, 255, 55)',
    'rgb(42, 237, 119)',
    'rgb(38, 219, 231)',
    'rgb(255, 130, 50)',
    'rgb(247, 68, 229)',
    'rgb(10, 33, 180)',
    'rgb(245, 45, 105)',
    'rgb(60, 191, 255)',
    'rgb(255, 37, 37)',
    'rgb(57, 237, 42)'
  ],
  currentColour: null
})

/* ------------- Reducers ------------- */

export const getStaticData = (state, action) => state.merge({ fetching: true })
export const setColor = (state, action) => state.merge({ currentColour: action.color })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_STATIC_DATA_REQUEST]: getStaticData,
  [Types.SET_COLOR]: setColor
  // [Types.GET_RANDOM_WORD_SUCCESS]: successWord,
  // [Types.GET_RANDOM_WORD_FAILURE]: failure
})
