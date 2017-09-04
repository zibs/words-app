import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

import { WordsTypes } from '../redux/WordsRedux'
import { StartupTypes } from '../redux/StartupRedux'
/* ------------- Sagas ------------- */

import startupSaga from './StartupSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

const rootGenerator = function* root() {
  yield all(
    [
      // some sagas only receive an action
      takeLatest(StartupTypes.STARTUP, startupSaga),
      // some sagas receive extra parameters in addition to an action
      // takeLatest(WordsTypes.GET_WORDS_REQUEST, getWordsSaga, api)
      // takeLatest(WordsTypes.GET_WORD_REQUEST, getWordSaga, api)
    ]
  )
}
export default rootGenerator
