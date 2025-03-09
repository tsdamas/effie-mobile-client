
//Icons + label for tab menu or hidden hamburger menu

//import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ButtonIcon from './ButtonIcon'
import styles from '../assets/styles/MenuItemStyles'

export default function MenuItem({
  iconName,
  onPress,
  btnSize,
  btnStyle,
  btnColor,
  text,
  textStyle,
  menuItemStyle,
}) {
  textStyle = textStyle === 'undefined' ? styles.text_label : textStyle;
  menuItemStyle = menuItemStyle === 'undefined' ? styles.menu_item : menuItemStyle;

  return (
    <TouchableOpacity style={menuItemStyle} onPress={onPress}>
      <ButtonIcon
        onPress={onPress}
        btnStyle={btnStyle}
        btnSize={btnSize}
        btnColor={btnColor}
        iconName={iconName}
      />
      <View style={styles.textContainer}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Default styles for Menu Item
// const styles = StyleSheet.create({
//   menu_item: {
//     flexDirection: 'row', // Ensure the items are aligned horizontally
//     alignItems: 'center', // Align items vertically centered
//     paddingVertical: 10,
//   },
//   textContainer: {
//     marginLeft: 10, // Space between the icon and text
//     flex: 1, // Allow text to take remaining space
//   },
//   text_label: {
//     fontSize: 14,
//     color: '#000',
//     lineHeight: 20, // Adjust line height to align with the icon
//   },
// });
