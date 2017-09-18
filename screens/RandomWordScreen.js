import React from 'react'
import { connect } from 'react-redux'
import QuizActions from '../redux/QuizRedux'
import * as Progress from 'react-native-progress'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Touchable from 'react-native-platform-touchable'

class RandomWordScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false
    }
  }
  static navigationOptions = {
    header: null
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.quiz.fetching && !nextProps.quiz.fetching) {
      setTimeout(() => {
        this.setState({ animating: false })
      }, 1500)
    } else if (!this.props.quiz.fetching && nextProps.quiz.fetching) {
      this.setState({ animating: true })
    }
  }

  render() {
    const { randomWord, isRevealed, currentColour, quiz } = this.props
    if (quiz.fetching || this.state.animating) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Progress.CircleSnail size={200} thickness={7} color={currentColour} />
        </View>
      )
    } else {
      return (
        <Touchable
          style={styles.container}
          onPress={this.handlePress}
          background={Touchable.Ripple(currentColour)}
          activeOpacity={0.5}
          underlayColor="red">
          <ScrollView>
            <View
              style={[
                styles.center,
                { marginTop: 44, marginBottom: 64, borderBottomWidth: 3, borderBottomColor: currentColour }
              ]}>
              <Text style={{ fontWeight: '500', fontSize: 34, flexWrap: 'wrap', flex: 1, marginLeft: 15 }}>
                {randomWord.word}
              </Text>
            </View>
            {isRevealed &&
              <View style={[styles.center, { marginHorizontal: 15 }]}>
                <Text style={{ fontSize: 22, flexWrap: 'wrap', flex: 1 }}>
                  {randomWord.definition}
                </Text>
              </View>}
          </ScrollView>
        </Touchable>
      )
    }
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
