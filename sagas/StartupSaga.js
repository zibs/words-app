import { put, select } from 'redux-saga/effects'
import WordActions from '../redux/WordsRedux'

// process STARTUP actions
const startupSaga = function* startup(action) {
  yield put(WordActions.getWordsRequest())
}

export default startupSaga
