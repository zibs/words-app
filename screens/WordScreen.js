import React from 'react'
import { Image, Platform, StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../redux/StartupRedux'
import WordActions from '../redux/WordsRedux'
import Touchable from 'react-native-platform-touchable'
import R from 'ramda'

class WordsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const { currentWord, currentColour } = this.props
    const { navigation: { state: { params } } } = this.props
    return (
      <ScrollView style={styles.container} contentContainerStyle={{}}>
        <View
          style={[
            styles.center,
            { marginTop: 44, marginBottom: 64, borderBottomWidth: 3, borderBottomColor: currentColour }
          ]}>
          <Text style={{ fontWeight: '500', fontSize: 34, flexWrap: 'wrap', flex: 1, marginHorizontal: 15 }}>
            {currentWord.word || params.id}
          </Text>
        </View>
        <View style={[styles.center, {marginHorizontal: 15}]}>
          <Text style={{ fontSize: 22, flexWrap: 'wrap', flex: 1 }}>
            {currentWord.definition || params.definition}
          </Text>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#fff'
  }
})

const mapStateToProps = state => {
  return {
    words: state.words,
    currentWord: state.words.word,
    colours: state.static.colours,
    currentColour: state.static.currentColour
  }
}
export default connect(mapStateToProps)(WordsScreen)
