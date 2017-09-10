import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

import { WordsTypes } from '../redux/WordsRedux'
import { StartupTypes } from '../redux/StartupRedux'
import { QuizTypes } from '../redux/QuizRedux'
/* ------------- Sagas ------------- */

import startupSaga from './StartupSaga'
import getWordsSaga from './GetWordsSaga'
import getWordSaga from './GetWordSaga'
import getRandomWordSaga from './GetRandomWordSaga'

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
      takeLatest(WordsTypes.GET_WORDS_REQUEST, getWordsSaga, api),
      takeLatest(WordsTypes.GET_WORD_REQUEST, getWordSaga, api),
      takeLatest(QuizTypes.GET_RANDOM_WORD_REQUEST, getRandomWordSaga, api),
      takeLatest(QuizTypes.RESET_RANDOM_WORD, getRandomWordSaga, api)
      // some sagas receive extra parameters in addition to an action
      // takeLatest(WordsTypes.GET_WORD_REQUEST, getWordSaga, api)
    ]
  )
}
export default rootGenerator
