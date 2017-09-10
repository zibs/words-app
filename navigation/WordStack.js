import React from 'react'
import { StackNavigator } from 'react-navigation'
import WordScreen from '../screens/WordScreen'
import WordsScreen from '../screens/WordsScreen'
export default (WordsStack = StackNavigator(
  {
    WordsScreen: {
      screen: WordsScreen
    },
    Word: {
      screen: WordScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'WordsScreen'
  }
))
