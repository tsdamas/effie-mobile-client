//UI for incoming and outgoing messages
import { textToSpeech } from '../services/TTSPayload.js';
import React, { useState } from 'react'
//import { View, Text, StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, ActivityIndicator  } from 'react-native';
import styles from '../assets/styles/ChatBubbleStyles.js';        // Importing styles

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
};
