//import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { View, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ButtonIcon from './ButtonIcon';
import VoiceMode from '../services/VoiceMode.js';
import styles from './SendBoxStyles';

export default function SendBox( {onSendMessage}) {
  //set default voice mode to false
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  //send button pressed, reset text field
  const handleSend = () => {
    if (text.trim()) {
     // console.log('Sending message:', text);
      onSendMessage(text);
      setText('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  return (
    <View style={styles.sendBoxContainer}>
      {isVoiceMode ? (
        //changes chatbox to voice mode box
        <VoiceMode onCancel={() => setIsVoiceMode(false)} />
      ) : (
        <>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="What is on your mind?"
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
            //below lines are for hitting enter, wont work on mobile
            onSubmitEditing={handleSend} 
            returnKeyType="send"
          />
          <ButtonIcon 
            iconName="send" 
            btnStyle={styles.sendButton}
            onPress={handleSend}
            btnSize={24}
            btnColor="#006748"
          />
          <ButtonIcon 
            iconName="mic" 
            btnStyle={styles.micButton}
            onPress={() => setIsVoiceMode(true)}
            btnSize={24}
            btnColor="#006748"
          />
        </>
    )}
  </View>
  );
};
