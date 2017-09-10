import React from 'react'
import { connect } from 'react-redux'
import QuizActions from '../redux/QuizRedux'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Touchable from 'react-native-platform-touchable'

class RandomWordScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const { randomWord, isRevealed, currentColour } = this.props
    return (
      <Touchable style={styles.container} onPress={this.handlePress}>
        <ScrollView>
          <View
            style={[
              styles.center,
              { marginTop: 44, marginBottom: 64, borderBottomWidth: 3, borderBottomColor: currentColour }
            ]}>
            <Text style={{ fontWeight: '500', fontSize: 34, flexWrap: 'wrap', flex: 1 }}>
              {randomWord.word}
            </Text>
          </View>
          {isRevealed &&
            <View style={[styles.center]}>
              <Text style={{ fontSize: 22, flexWrap: 'wrap', flex: 1 }}>
                {randomWord.definition}
              </Text>
            </View>}
        </ScrollView>
      </Touchable>
    )
  }

  handlePress = () => {
    const { isRevealed, dispatch } = this.props
    if (isRevealed) {
      dispatch(QuizActions.resetRandomWord())
    } else {
      dispatch(QuizActions.revealDefinition())
    }
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
    randomWord: state.quiz.randomWord,
    quiz: state.quiz,
    isRevealed: state.quiz.revealed,
    currentColour: state.static.currentColour
  }
}

export default connect(mapStateToProps)(RandomWordScreen)
