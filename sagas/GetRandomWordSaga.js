import { put, select, call } from 'redux-saga/effects'
import { words, colours } from './selectors'
import Actions from '../redux/QuizRedux'
import StaticActions from '../redux/StaticRedux'
import { is } from 'ramda'
import R from 'ramda'
// process STARTUP actions
const getRandomWordSaga = function* getRandomWords(api) {
  // const wordsRedux = yield select(words)
  // let randomIdToFetch = Math.floor(Math.random() * (wordsRedux.words.last_id - wordsRedux.words.first_id) + wordsRedux.words.first_id)
  const {word} = yield select(words)
  const response = yield call(api.getRandom)
  if (response.ok) {
    if (!R.isEmpty(word)) {
      let allColours = yield select(colours)
      let colour = allColours[Math.floor(Math.random() * allColours.length)]
      yield put(StaticActions.setColor(colour))
    }
    yield put(Actions.getRandomWordSuccess(response.data))
  } else {
    yield put(Actions.getRandomWordFailure(response.problem))
  }
}
export default getRandomWordSaga
