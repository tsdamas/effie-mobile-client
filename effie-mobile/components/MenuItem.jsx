
//Icons + label for tab menu or hidden hamburger menu

//import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ButtonIcon from './ButtonIcon';
import styles from './MenuItemStyles';

export default function MenuItem({
  iconName,
  onPress,
  btnSize,
  btnStyle,
  btnColor,
  text,
  textStyle = styles.text_label,
  menuItemStyle = styles.menu_item,
}) {
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
