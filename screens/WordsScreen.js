import React from 'react'
import { Image, Platform, StyleSheet, Text, View, Button, SectionList, ListView } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from '../redux/StartupRedux'
import WordActions from '../redux/WordsRedux'
import StaticActions from '../redux/StaticRedux'
import Touchable from 'react-native-platform-touchable'
import R from 'ramda'

class WordsScreen extends React.Component {
  constructor(props) {
    super(props)
    const rowHasChanged = (r1, r2) => r1.id !== r2.id
    const sectionHeaderHasChanged = (s1, s2) => s1.id !== s2.id

    const ds = new ListView.DataSource({
      rowHasChanged,
      sectionHeaderHasChanged
    })
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.props.listView)
    }
  }
  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this.props.dispatch(StartupActions.startup())
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.listView) })
  }

  render() {
    const { words: { words: { section_list }, count, fetching } } = this.props
    const { sectionList } = this.props
    const { listView } = this.props
    return (
      <View style={styles.container}>
        {/* <SectionList
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item, index) => `${index}-${item.id}`}
          stickySectionHeadersEnabled={true}
          sections={sectionList}
          renderSectionHeader={this._renderSectionHeader}
          renderItem={this._renderRow}
          onRefresh={() => this.props.dispatch(WordActions.getWordsRequest())}
          refreshing={fetching}
          initialNumToRender={count}
        /> */}
        <ListView
          ref={listview => (this.listView = listview)}
          dataSource={this.state.dataSource}
          renderRow={this.renderRowData}
          renderSectionHeader={this.renderSectionData}
          stickySectionHeadersEnabled={true}
          scrollEventThrottle={16}
          initialListSize={20}
          // removeClippedSubviews={false} // @TODO remove with flatlist
          // enableEmptySections
          pageSize={100}
          scrollRenderAheadDistance={500}
          renderSeparator={(sectionId, rowId) =>
            <View
              key={`${sectionId}-${rowId}`}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(184, 184, 184)',
                marginLeft: 15
              }}
            />}
        />
      </View>
    )
  }

  renderRowData = rowData => {
    return (
      <Touchable
        onPress={() => this.selectWord(rowData)}
        style={{ flex: 1, height: 44, justifyContent: 'center', paddingLeft: 15 }}>
        <Text style={{ fontSize: 17 }}>
          {rowData.word}
        </Text>
      </Touchable>
    )
  }

  selectWord = word => {
    const { colours, dispatch, navigation } = this.props
    console.tron.log("colours")
    console.tron.log(colours)
    let colour = colours[Math.floor(Math.random() * colours.length)]
    dispatch(WordActions.getWordSuccess(word))
    dispatch(WordActions.getWordRequest(word))
    dispatch(StaticActions.setColor(colour))
    navigation.navigate('Word', word)
  }

  renderSectionData = (section, sectionId) => {
    return (
      <View style={{ height: 44, paddingLeft: 15 }}>
        <Text style={{ fontSize: 44 }}>
          {sectionId}
        </Text>
      </View>
    )
  }

  _renderRow = ({ item }) => {
    return (
      <Touchable onPress={() => {}} style={{ flex: 1, height: 44, justifyContent: 'center' }}>
        <Text>
          {item.word}
        </Text>
      </Touchable>
    )
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={{ height: 44 }}>
        <Text style={{ fontSize: 44 }}>
          {section.key}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  WordsScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})

const mapStateToProps = state => {
  return {
    words: state.words,
    listView: R.pathOr({}, ['words', 'words', 'list_view'], state),
    sectionList: R.pathOr([], ['words', 'words', 'section_list'], state),
    colours: state.static.colours
  }
}
export default connect(mapStateToProps)(WordsScreen)
