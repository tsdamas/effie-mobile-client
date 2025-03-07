/*      The MessageList component is a chat message display component that shows a list of messages,
         where each message is rendered in a chat bubble. The chat bubbles are styled differently 
         based on whether the message is from the user or from the AI, ensuring clear communication 
         in a chat interface.
*/

//import { View, Text, StyleSheet } from 'react-native'
import { View } from 'react-native';
import React from 'react';
import ChatBubble from './ChatBubble';
import styles from './MessageListStyles';

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
};
