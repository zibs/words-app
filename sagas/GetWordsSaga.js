import { put, select, call } from 'redux-saga/effects'
import Actions from '../redux/WordsRedux'
import QuizActions from '../redux/QuizRedux'

const getWordsSaga = function* getWords(api, action) {
  const response = yield call(api.getWords)
  if (response.ok) {
    yield put(Actions.getWordsSuccess(response.data))
    yield put(QuizActions.getRandomWordRequest())
  } else {
    yield put(Actions.getWordsFailure(response.problem))

  }
}
export default getWordsSaga
