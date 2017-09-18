import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
  ListView
} from "react-native";
import { AppLoading } from "expo";
import { connect } from "react-redux";
import StartupActions from "../redux/StartupRedux";
import WordActions from "../redux/WordsRedux";
import StaticActions from "../redux/StaticRedux";
import * as Progress from "react-native-progress";
import Touchable from "react-native-platform-touchable";
import R from "ramda";

class WordsScreen extends React.Component {
  constructor(props) {
    super(props);
    const rowHasChanged = (r1, r2) => r1.id !== r2.id;
    const sectionHeaderHasChanged = (s1, s2) => s1.id !== s2.id;

    const ds = new ListView.DataSource({
      rowHasChanged,
      sectionHeaderHasChanged
    });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.props.listView)
    };
  }
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.dispatch(StartupActions.startup());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        nextProps.listView
      )
    });
  }

  render() {
    const { words: { words: { section_list }, count, fetching }, currentColour } = this.props;
    const { sectionList } = this.props;
    const { listView } = this.props;
    if (R.isEmpty(this.props.words.words)) {
      return (
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          <Progress.CircleSnail
            size={200}
            thickness={7}
            color={currentColour}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView
          ref={listview => (this.listView = listview)}
          dataSource={this.state.dataSource}
          renderRow={this.renderRowData}
          renderSectionHeader={this.renderSectionData}
          scrollEventThrottle={16}
          stickySectionHeadersEnabled={true}
          initialListSize={20}
          pageSize={100}
          scrollRenderAheadDistance={500}
          renderSeparator={(sectionId, rowId) => (
            <View
              key={`${sectionId}-${rowId}`}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "rgb(223, 223, 223)",
                marginLeft: 15
              }}
            />
          )}
        />
      </View>
    );
  }

  renderRowData = rowData => {
    return (
      <Touchable
        onPress={() => this.selectWord(rowData)}
        style={{
          flex: 1,
          height: 44,
          justifyContent: "center",
          paddingLeft: 15
        }}
      >
        <Text style={{ fontSize: 19 }}>{rowData.word}</Text>
      </Touchable>
    );
  };

  renderSectionData = (section, sectionId) => {
    return (
      <View style={{ height: 84, paddingLeft: 15, backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 74,
            fontFamily: "eileen",
            color: this.props.currentColour
          }}
        >
          {sectionId}
        </Text>
      </View>
    );
  };

  selectWord = word => {
    const { colours, dispatch, navigation } = this.props;
    let colour = colours[Math.floor(Math.random() * colours.length)];
    dispatch(WordActions.getWordSuccess(word));
    dispatch(WordActions.getWordRequest(word));
    dispatch(StaticActions.setColor(colour));
    navigation.navigate("Word", word);
  };

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
    backgroundColor: "#fff"
  }
});

const mapStateToProps = state => {
  return {
    words: state.words,
    listView: R.pathOr({}, ["words", "words", "list_view"], state),
    sectionList: R.pathOr([], ["words", "words", "section_list"], state),
    colours: state.static.colours,
    currentColour: state.static.currentColour
  };
};
export default connect(mapStateToProps)(WordsScreen);
