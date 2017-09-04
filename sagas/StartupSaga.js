import { put, select } from 'redux-saga/effects'
import Actions from '../redux/WordsRedux'
import { is } from 'ramda'

// exported to make available for tests
// export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
const startupSaga = function* startup(action) {
  yield put(Actions.getWordsRequest())
}

export default startupSaga
