import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import Voice from '@react-native-community/voice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PermissionsAndroid } from 'react-native';

import Button from '../components/Button';

export default function VoiceMode({ onCancel }) {
  const [dots, setDots] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechText, setSpeechText] = useState('');

  async function requestMicrophonePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone for voice recognition.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
  
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

//   useEffect(() => {
//     let count = 1;
//     const interval = setInterval(() => {
//       setDots('\u2022'.repeat(count)); // bullets (later change to voice waves when picking up voice signals)
//       count = (count % 7) + 1; // Cycle between 1 to 7 dots
//     }, 500);

//     return () => clearInterval(interval);    //clear bullets
//   }, []);

  // Initialize voice recognition event listeners
  useEffect(() => {
    if (!Voice) return;

    Voice.onSpeechResults = (event) => {
        console.log("Speech results:", event.value); //DEBUGGER FOR SPEECH OUTPUT
      setSpeechText(event.value[0]); //Get the recognized text
    };
    
    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };

    return () => {
        Voice.destroy()
          .then(() => {
            if (Voice && Voice.removeAllListeners) {
              Voice.removeAllListeners();
            }
          })
          .catch((error) => console.error(error));
      };
  }, []);
  
  useEffect(() => {
    startListening();
  }, []);

  // Starting voice recognition
  const startListening = async () => {
    if (!Voice) return;
  
    const hasPermission = await requestMicrophonePermission();
    if (hasPermission) {
      try {
        setIsListening(true);
        setSpeechText('');
        await Voice.start('en-US');
      } catch (error) {
        console.error('Voice recognition error:', error);
      }
    } else {
      console.log('Microphone permission denied');
    }
  };

  // Stopping voice recognition
  const stopListening = async () => {
    try {
        if (!Voice) return;

      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice:', error);
    }
  };

  // When send button is pressed, send speech text to chat
  const handleSend = () => {
    if (!speechText.trim()) {
        //console.warn('No speech recognized'); 
      } else {
        onSpeechResult(speechText);
      }
      // Always close voice mode anyway
      onCancel();
  };

  const handleCancel = async () => {
    if (isListening) {
      await stopListening();
    }
    onCancel(); // Only call `onCancel` AFTER stopping voice
  };

  return (
    <View style={styles.container}>
      <Button iconName="trash" style={styles.trashButton} onPress={handleCancel} />
      {/* Speech text or animated dots */}
      <Text style={styles.text}>
        {isListening ? dots : speechText || 'Listening...'}
      </Text>
      <Button iconName="send" style={styles.sendButton} onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        paddingHorizontal: wp(1),
        width: wp(80),
        height: hp(5),
      },
      trashButton: {
        marginRight: wp(3),
      },
      text: {
        flex: 1,
        textAlign: 'center',
        fontSize: hp(2),
        color: '#555',
      },
      sendButton: {
        marginLeft: wp(3),
      },
});
