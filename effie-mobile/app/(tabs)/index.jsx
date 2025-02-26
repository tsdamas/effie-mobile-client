/**
 * This is our chat screen and will work as the "home" of the app for now.
 * 
 * We have to wrap this screen in a special view to make the contents
 *  scrollable when the keyboard appears in the screen.
 * 
 */

import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MessageList from "@/components/MessageList";
import SendBox from "@/components/SendBox";


export default function Index() {
  
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (msg) => {
    setMessages([...messages, msg]);
  };

  return (
    <CustomKeyboardView style={styles.container}>
      <Text style={styles.text}>How can I help you?</Text>
      <MessageList messages={messages} />
      <SendBox onSendMessage={handleSendMessage} />
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
    fontSize: hp(5),
    fontWeight: 'bold'
  }
});