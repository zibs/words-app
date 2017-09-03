import { NativeModules } from 'react-native'
import url from 'url'
import Reactotron from 'reactotron-react-native'

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL)

// App.js
if (__DEV__) {
  Reactotron.configure({ host: hostname, name: 'Words App' }).useReactNative().connect()
  console.tron = Reactotron
}
