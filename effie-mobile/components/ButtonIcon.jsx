//Reusable buttons, we could use FontAwesome here or Ionicons

import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ButtonIcon({ iconName, onPress, btnSize, btnStyle, btnColor }) {
  // DEFAULTS

const defaultButtonSize = 24;
const defaultButtonColor = "black";
const defaultOnPress = () => {}

btnStyle = btnStyle == 'undefined' ? styles.button_default : btnStyle;
onPress = onPress == 'undefined' ? defaultOnPress : onPress;
btnColor = btnColor == 'undefined' ? defaultButtonColor : btnColor;
btnSize = btnSize == 'undefined' ? defaultButtonSize : btnSize;

  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      <Ionicons name={iconName} size={btnSize} color={btnColor} />
    </TouchableOpacity>
  );
}

//Default styles for Button Icon
const styles = StyleSheet.create({
  button_default: {
    padding: 10,
    borderRadius: 8,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});