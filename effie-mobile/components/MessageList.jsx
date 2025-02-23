import { View, Text } from 'react-native'
import React from 'react'

export default function MessageList({ messages }) {
  return (
    <View>
      <Text>{messages}</Text>
    </View>
  )
}