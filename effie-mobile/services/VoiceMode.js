// VoiceMode.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { startRecording, stopRecording, getRawPCMFromWav } from './AudioRecorder';
import { sendToSTTApi } from './STT.js';
import ButtonIcon from '../components/ButtonIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function VoiceMode({ onCancel, onSpeechResult }) {
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Listening...');

  useEffect(() => {
    (async () => {
      console.log("VoiceMode mounted. Attempting to start recording...");
      const started = await startRecording();
      if (started) {
        setIsRecording(true);
        setStatusMessage('Recording...');
        console.log("Recording is active.");
      } else {
        console.log("Recording could not be started.");
        alert('Unable to start recording. Please check permissions.');
        onCancel();
      }
    })();
  }, []);

  const handleSend = async () => {
    console.log("handleSend triggered");
    if (!isRecording) {
      console.log("Not recording. Cancelling.");
      onCancel();
      return;
    }
    setIsRecording(false);
  
    console.log("Stopping recording...");
    const wavUri = await stopRecording();
    if (!wavUri) {
      console.log('Recording failed or was cancelled.');
      onCancel();
      return;
    }
    console.log("WAV file saved at:", wavUri);
  
    console.log("Sending audio file to STT API...");
    const transcript = await sendToSTTApi(wavUri, 44100);
  
    if (transcript) {
      console.log("Received transcript from STT API:", transcript);
      onSpeechResult(transcript);
    } else {
      console.log('No transcript received from STT API');
    }
    console.log("Closing VoiceMode.");
    onCancel();
  };
  

  const handleCancel = async () => {
    console.log("Cancel triggered");
    if (isRecording) {
      console.log("Recording is active. Stopping recording before cancel.");
      await stopRecording();
      setIsRecording(false);
    }
    onCancel();
  };

  return (
    <>
      <ButtonIcon iconName="trash" style={styles.cancelButton} onPress={handleCancel} />
      <TextInput style={[styles.input, styles.centeredText]} value={statusMessage} editable={false} />
      <ButtonIcon iconName="send" style={styles.sendButton} onPress={handleSend} />
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
