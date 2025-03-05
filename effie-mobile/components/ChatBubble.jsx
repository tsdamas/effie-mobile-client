//UI for incoming and outgoing messages
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { textToSpeech } from '../assets/TTSPayload.js';

export default function ChatBubble({ message, role }) {
  const isUser = role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTTS = async () => {
    console.log('TTS button pressed for message:', message);
    setIsPlaying(true);
    try {
      await textToSpeech(message);
      console.log('TTS completed successfully.');
    } catch (error) {
      console.error('TTS error:', error);
    }
    setIsPlaying(false);
  };

  return (
    <View style={styles.bubble}>
      <Text style={styles.text}>{message}</Text>
      {/* Only show TTS button for assistant messages */}
      {!isUser && (
        <TouchableOpacity onPress={handleTTS} style={styles.ttsButton}>
          {isPlaying ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text style={styles.ttsButtonText}>🔊</Text>
          )}
        </TouchableOpacity>
      )}
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
  ttsButton: {
    marginRight: 8,
    padding: 4,
  },
  ttsButtonText: {
    fontSize: 20,
  }
});