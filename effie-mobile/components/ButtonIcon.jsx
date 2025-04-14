//Reusable buttons, we could use FontAwesome here or Ionicons

import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../assets/styles/ButtonIconStyles';           // Importing Styles

export default function ButtonIcon({ iconName, onPress, btnSize, btnStyle, btnColor, testID }) {
  
  // DEFAULTS
  const defaultButtonSize = 54;
  const defaultButtonColor = "black";
  const defaultOnPress = () => {}

  // Assigning defaults to props if they are undefined
  btnStyle = btnStyle == 'undefined' ? styles.button_default : btnStyle;
  onPress = onPress == 'undefined' ? defaultOnPress : onPress;
  btnColor = btnColor == 'undefined' ? defaultButtonColor : btnColor;
  btnSize = btnSize == 'undefined' ? defaultButtonSize : btnSize;

  return (
    <TouchableOpacity onPress={onPress} style={btnStyle} testID={testID}>
      <Ionicons name={iconName} size={btnSize} color={btnColor} />
    </TouchableOpacity>
  );
};