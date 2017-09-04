import { put, select, call } from 'redux-saga/effects'
import Actions from '../redux/WordsRedux'
import { is } from 'ramda'

// exported to make available for tests
// export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
const getWordsSaga = function* getWords(api, action) {
  const response = yield call(api.getWords)
  if (response.ok) {
    yield put(Actions.getWordsSuccess(response.data))
  } else {
    // notification
  }
}
export default getWordsSaga
