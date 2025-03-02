/**
 * This is our chat screen and will work as the "home" of the app for now.
 * 
 * We have to wrap this screen in a special view to make the contents
 *  scrollable when the keyboard appears in the screen.
 * 
 */

import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MessageList from "@/components/MessageList";
import SendBox from "@/components/SendBox";
import { getChunkedResponse } from "@/services/StreamService"; 


export default function Index() {
  const [messages, setMessages] = useState([]);
  
  const handleSendMessage = (userText) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
      { role: "assistant", content: "" } 
    ]);

    getChunkedResponse(userText, (partialText) => {
      setMessages((prev) => {
        const updated = [...prev];
        //Update the last message (assistant's response) with the partial text
        updated[updated.length - 1] = { role: "assistant", content: partialText };
        return updated;
      });
    });
  };

  return (
    <CustomKeyboardView style={styles.container}>
      <Text style={styles.text}>How can I help you?</Text>
      <ScrollView style={styles.chatContainer}>
        <MessageList messages={messages} />
      </ScrollView>
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
  },
  chatContainer: {
    flex: 1,
    width: '80%',          
    
  },
});