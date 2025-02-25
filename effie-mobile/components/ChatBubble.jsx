//UI for incoming and outgoing messages
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ChatBubble({ message }) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  bubble: {
    maxWidth: '40%', 
    padding: 10,
    marginVertical: 4,
    alignSelf: 'flex-end',
    backgroundColor: '#e4e4e4',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
});