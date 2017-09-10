import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    words: require('./WordsRedux').reducer,
    quiz: require('./QuizRedux').reducer,
    static: require('./StaticRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
