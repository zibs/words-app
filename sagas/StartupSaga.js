import { put, select } from 'redux-saga/effects'
import {colours} from './selectors'
import WordActions from '../redux/WordsRedux'
import StaticActions from '../redux/StaticRedux'

// process STARTUP actions
const startupSaga = function* startup(action) {
  yield put(WordActions.getWordsRequest())
  let allColours = yield select(colours)
  let colour = allColours[Math.floor(Math.random() * allColours.length)]
  yield put(StaticActions.setColor(colour))
}

export default startupSaga
