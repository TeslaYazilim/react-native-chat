import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  Image
} from 'react-native';
import * as firebase from "firebase";

console.ignoredYellowBox = [
  'Setting a timer'
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionUserId: 1,
      sessionUserName: "Mehmet Emin",
      messages: [],
      newMessage: ""
    };

    firebase.initializeApp({
      apiKey: "AIzaSyDVfgP9u9XSeoJw798uNelgD-E7Kp5UziY",
      authDomain: "react-native-chat-app-974bd.firebaseapp.com",
      databaseURL: "https://react-native-chat-app-974bd.firebaseio.com",
      storageBucket: "react-native-chat-app-974bd.appspot.com"
    });
  }

  componentDidMount() {
    var that = this;
    var messages = [];

    firebase.database().ref('messages').on("child_added", function (data, prevChildKey) {
      var addedData = data.val();
      messages.push({
        userId: addedData.userId,
        userName: addedData.userName,
        message: addedData.message,
        date: addedData.date
      });

      that.setState({
        messages: messages
      });
    });
  }

  onSubmitEditing = (e) => {
    this.sendMessage();
  }

  onPressButtonSendMessage = () => {
    this.sendMessage();
  }

  sendMessage() {
    var that = this;

    firebase.database().ref('messages/' + that.guid()).set({
      userId: that.state.sessionUserId,
      userName: that.state.sessionUserName,
      message: that.state.newMessage,
      date: new Date().getTime()
    }, function (error) {
      that.setState({
        newMessage: ""
      });

      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
      }
    });
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.board}>
          <ScrollView ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}>
            {
              this.state.messages.map((item, index) =>
                <View style={[styles.messageItem, this.state.sessionUserId === item.userId ? styles.messageItemRight : null]} key={index}>
                  <Text style={styles.messageItem_userName}>{item.userName}</Text>
                  <Text>{item.message}</Text>
                  <Text style={styles.messageItem_time}>{(new Date(item.date)).toLocaleTimeString().match(/\d{2}:\d{2}|[AMP]+/g).join(' ')}</Text>
                </View>
              )
            }
          </ScrollView>

          <View style={styles.sendMessageContainer}>
            <View style={styles.sendMessageTextInputContainer}>
              <TextInput style={styles.messageTextInput} editable={true} underlineColorAndroid={'transparent'}
                onSubmitEditing={this.onSubmitEditing}
                onChangeText={(text) => this.setState({ newMessage: text })}
                value={this.state.newMessage} />
            </View>
            <View>
              <TouchableHighlight style={styles.sendTouchable} onPress={this.onPressButtonSendMessage}>
                <Image style={{ width: 30, height: 30 }} source={require('./img/send_icon.png')} />
              </TouchableHighlight>
            </View>
          </View>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  board: {
    flex: 1,
    ...Platform.select({
      ios: {

      },
      android: {
        paddingTop: 25
      }
    }),
    padding: 10,
    backgroundColor: '#ccefff',
    justifyContent: 'center',
  },
  sendMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendMessageTextInputContainer: {
    flex: 1
  },
  sendTouchable: {
    borderRadius: 50,
    padding: 18,
    marginLeft: 5
  },
  messageTextInput: {
    backgroundColor: '#fff',
    fontSize: 16,
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50
  },
  messageItem: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-start',
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    marginTop: 5,
  },
  messageItem_time: {
    fontSize: 11,
    alignSelf: 'flex-end',
    color: "#9D9D9D",
    marginTop: 1
  },
  messageItem_userName: {
    fontSize: 12,
    color: "#128C7E",
    marginBottom: 5
  },
  messageItemRight: {
    alignSelf: 'flex-end'
  }
});
