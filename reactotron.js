import { NativeModules } from 'react-native'
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import url from 'url'


const { hostname } = url.parse(NativeModules.SourceCode.scriptURL)

// App.js
if (__DEV__) {
  Reactotron.configure({ host: hostname, name: 'Words App' })
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect()
  console.tron = Reactotron
}
