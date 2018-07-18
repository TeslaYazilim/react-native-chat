import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TextInput } from 'react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state={
      text: "deneme"
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatMessages}>
          <Text>{this.state.text}</Text>
        </View>
        <View style={styles.writeMessage}>
          <TextInput
            style={styles.writeMessage_input}
            // onChangeText={(text) => this.setState({text})}
            onSubmitEditing={(event) => this.setState({text: event.nativeEvent.text})} 
            value={this.state.text}
          />
          
        </View>
      </View> 
    ); 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatMessages: {
    flex: 10,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  writeMessage: {
    flex: 1,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  writeMessage_input: {
    /*height: 40,
    /*borderColor: 'gray',
    borderWidth: 1,*/
    width: '100%',
  },
});
