import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ButtonIcon from './ButtonIcon';
import VoiceMode from '../services/VoiceMode.js';

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
}

const styles = StyleSheet.create({
  sendBoxContainer: {
    position: 'relative',
    bottom: hp(1.2), 
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(80),
    height: hp(7),
    paddingHorizontal: wp(0.2),
    paddingVertical: hp(1.5),
    backgroundColor: 'white', 
    borderRadius: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
  },
  input: {
    height: hp(6),
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: wp(2),
    fontSize: hp(2),
    color: 'black',
    flex: 1,
  },
  sendButton: {
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  micButton: {
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2), 
  },
});
