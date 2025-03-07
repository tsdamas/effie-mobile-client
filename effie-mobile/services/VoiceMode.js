import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import ButtonIcon from '../components/ButtonIcon';

export default function VoiceMode({ onCancel }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    let count = 1;
    const interval = setInterval(() => {
      setDots('\u2022'.repeat(count)); // bullets (later change to voice waves when picking up voice signals)
      count = (count % 7) + 1; // Cycle between 1 to 7 dots
    }, 500);
    //clear bullets
    return () => clearInterval(interval);
  }, []);

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
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  cancelButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#ff4d4d',
  },
});
