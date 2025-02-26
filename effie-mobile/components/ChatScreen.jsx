import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MessageList from './MessageList';
import SendBox from './SendBox';
import { addMessageListener, removeMessageListener } from '../assets/MessageEvents.js'; 

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const listener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    addMessageListener(listener);

    return () => {
      removeMessageListener(listener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MessageList messages={messages} />
      <SendBox />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
