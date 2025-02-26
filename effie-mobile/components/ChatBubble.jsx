//UI for incoming and outgoing messages
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ChatBubble({ message, role }) {
  const isUser = role === 'user';

  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#e4e4e4',
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    flexWrap: 'wrap',
  },
});