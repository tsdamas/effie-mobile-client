//UI for incoming and outgoing messages

import React from 'react'
//import { View, Text, StyleSheet } from 'react-native'
import { View, Text } from 'react-native';
import styles from './ChatBubbleStyles';        // Importing styles

export default function ChatBubble({ message, role }) {
  const isUser = role === 'user';

  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};