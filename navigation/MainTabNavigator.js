import React from 'react'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

import Colors from '../constants/Colors'

import RandomWordScreen from '../screens/RandomWordScreen'

import SettingsScreen from '../screens/SettingsScreen'
import WordStack from './WordStack'

export default TabNavigator(
  {
    Words: {
      screen: WordStack
    },
    Links: {
      screen: RandomWordScreen
    }
    // Settings: {
    //   screen: SettingsScreen,
    // },
  },
  {
    navigationOptions: ({ navigation, dispatch }) => ({
      tabBarVisible: false
    }),
    animationEnabled: true,
    swipeEnabled: true,
    lazy: true
  }
)
