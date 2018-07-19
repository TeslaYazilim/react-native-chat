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

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionUserId: 1,
      messages: [{
        userId: 1,
        userName: "mehmet",
        message: "sss bir mesaj bu",
        date: 1531943816307
      },
      {
        userId: 2,
        userName: "mucahit",
        message: "Mesaj sss",
        date: 1531943816307
      },
      {
        userId: 3,
        userName: "cagdas",
        message: "Test deneme 2222",
        date: 1531943816307
      },
      {
        userId: 1,
        userName: "mehmet",
        message: "Bu da bir mesaj yani",
        date: 1531943816307
      }]
    };
  }

  onSubmitEditing = (e) => {
    alert(e.nativeEvent.text);
    e.nativeEvent.text = "";
  }

  onPressButtonSendMessage = () => {


    
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.board}>
          <ScrollView>
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
              <TextInput style={styles.messageTextInput} editable={true} underlineColorAndroid={'transparent'} onSubmitEditing={this.onSubmitEditing} />
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
