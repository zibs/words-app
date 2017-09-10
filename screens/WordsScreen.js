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
        <ListView
          ref={listview => (this.listView = listview)}
          dataSource={this.state.dataSource}
          renderRow={this.renderRowData}
          renderSectionHeader={this.renderSectionData}
          stickySectionHeadersEnabled={true}
          scrollEventThrottle={16}
          initialListSize={20}
          pageSize={100}
          scrollRenderAheadDistance={500}
          renderSeparator={(sectionId, rowId) =>
            <View
              key={`${sectionId}-${rowId}`}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(223, 223, 223)',
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


  renderSectionData = (section, sectionId) => {
    return (
      <View style={{ height: 64, paddingLeft: 15 }}>
        <Text style={{ fontSize: 64, fontFamily: "eileen", color: this.props.currentColour }}>
          {sectionId}
        </Text>
      </View>
    )
  }

  selectWord = word => {
    const { colours, dispatch, navigation } = this.props
    let colour = colours[Math.floor(Math.random() * colours.length)]
    dispatch(WordActions.getWordSuccess(word))
    dispatch(WordActions.getWordRequest(word))
    dispatch(StaticActions.setColor(colour))
    navigation.navigate('Word', word)
  }


  // _renderRow = ({ item }) => {
  //   return (
  //     <Touchable onPress={() => {}} style={{ flex: 1, height: 44, justifyContent: 'center' }}>
  //       <Text>
  //         {item.word}
  //       </Text>
  //     </Touchable>
  //   )
  // }
  //
  // _renderSectionHeader = ({ section }) => {
  //   return (
  //     <View style={{ height: 44 }}>
  //       <Text style={{ fontSize: 44 }}>
  //         {section.key}
  //       </Text>
  //     </View>
  //   )
  // }
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
    listView: R.pathOr({}, ['words', 'words', 'list_view'], state),
    sectionList: R.pathOr([], ['words', 'words', 'section_list'], state),
    colours: state.static.colours,
    currentColour: state.static.currentColour
  }
}
export default connect(mapStateToProps)(WordsScreen)
