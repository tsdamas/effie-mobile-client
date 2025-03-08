// VoiceMode.js
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { startRecording, stopRecording, fileToBase64, convertM4AToWav } from './AudioRecorder';
import { sendToSTTApi } from './STT.js';
import ButtonIcon from '../components/ButtonIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';


export default function VoiceMode({ onCancel, onSpeechResult }) {
  const [dots, setDots] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState('Listening...');

  // Start recording on mount
  useEffect(() => {
    (async () => {
      const granted = await requestMicrophonePermission();
      if (!granted) {
        console.log('Microphone permission denied');
        onCancel();
        return;
      }

      // Attempt to start recording
      const started = await startRecording();
      if (started) {
        setIsRecording(true);
      } else {
        onCancel();
      }
    })();
  }, []);

  // Stop recording, convert to base64, send to STT API
  const handleSend = async () => {
    console.log("handleSend triggered");
    if (!isRecording) {
      onCancel();
      return;
    }
    setIsRecording(false);

    const m4aUri = await stopRecording();
    if (!m4aUri) {
      onCancel();
      return;
    }

    setSpeechText('Processing...');

    const outputWavUri = FileSystem.documentDirectory + 'converted.wav';
    // Convert M4A to WAV (Float32)
    const wavUri = await convertM4AToWav(m4aUri, outputWavUri);
    if (!wavUri) {
      console.log('Conversion to WAV failed');
      onCancel();
      return;
    }

    // Convert file to base64
    const base64Data = await fileToBase64(wavUri);
    if (!base64Data) {
      console.log('Failed to read WAV as base64');
      onCancel();
      return;
    }

    // Send to STT server
    const transcript = await sendToSTTApi(base64Data, 44100);
    if (transcript) {
      setSpeechText(transcript);
      // Pass the recognized text back to parent
      onSpeechResult(transcript);
    } else {
      console.log('No transcript received');
    }

    // Finally, close voice mode
    onCancel();
  };

  const handleCancel = async () => {
    if (isRecording) {
      await stopRecording();
      setIsRecording(false);
    }
    onCancel();
  };

  return (
    <>
        <ButtonIcon 
        iconName="trash" 
        style={styles.cancelButton} 
        onPress={onCancel} 
      />
      <TextInput 
        style={[styles.input, styles.centeredText]} 
        value={dots} 
        editable={false} 
      />
      <ButtonIcon 
        iconName="send" 
        style={styles.cancelButton} 
        onPress={onCancel}
      />
    </>
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
