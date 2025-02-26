import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ChatBubble from './ChatBubble';

export default function MessageList({ messages }) {
  return (
    <View style={styles.container}>
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg} />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});