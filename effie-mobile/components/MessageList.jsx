import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ChatBubble from './ChatBubble';

export default function MessageList({ messages }) {
  return (
    <View style={styles.container}>
      {messages.map((msg, index) => (
        <View
          key={index}
          style={[
            styles.bubbleContainer,
            msg.role === 'user' ? styles.userContainer : styles.aiContainer,
          ]}
        >
          <ChatBubble message={msg.content} role={msg.role} />
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bubbleContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 4,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
});
