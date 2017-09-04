import { put, select, call } from 'redux-saga/effects'
import Actions from '../redux/WordsRedux'
import { is } from 'ramda'

// process STARTUP actions
const getWordSaga = function* getWords(api, {word}) {
  const response = yield call(api.getWord, word)
  if (response.ok) {
    yield put(Actions.getWordSuccess(response.data))
  } else {
    // notification
  }
}
export default getWordSaga
