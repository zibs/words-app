import { put, select, call } from 'redux-saga/effects'
import { words } from './selectors'
import Actions from '../redux/QuizRedux'
import { is } from 'ramda'
import R from 'ramda'
// process STARTUP actions
const getRandomWordSaga = function* getRandomWords(api) {
  // const wordsRedux = yield select(words)
  // let randomIdToFetch = Math.floor(Math.random() * (wordsRedux.words.last_id - wordsRedux.words.first_id) + wordsRedux.words.first_id)

  const response = yield call(api.getRandom)
  if (response.ok) {
    yield put(Actions.getRandomWordSuccess(response.data))
  } else {
    yield put(Actions.getRandomWordFailure(response.problem))
  }
}
export default getRandomWordSaga
