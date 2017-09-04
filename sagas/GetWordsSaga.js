import { put, select, call } from 'redux-saga/effects'
import { is } from 'ramda'

// exported to make available for tests
// export const selectAvatar = (state) => state.github.avatar

// process STARTUP actions
const getWordsSaga = function* startup(api, action) {
  
}

export default getWordsSaga
