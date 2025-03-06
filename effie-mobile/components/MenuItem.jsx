//Icons + label for tab menu or hidden hamburger menu
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ButtonIcon from './ButtonIcon'


export default function MenuItem({ iconName, onPress, btnSize, btnStyle, btnColor, text, textStyle, menuItemStyle }) {
  textStyle = textStyle == 'undefined' ? styles.text_label : textStyle;
  menuItemStyle = menuItemStyle == 'undefined' ? styles.menu_item : menuItemStyle;
  return (
    <TouchableOpacity style={menuItemStyle} onPress={onPress}>
      <ButtonIcon
          btnStyle={btnStyle}
          btnSize={btnSize}
          btnColor={btnColor}
          iconName={iconName}
      />
      <View style={styles.textContainer}>
        <Text style={textStyle}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
//Default styles for Menu Item
const styles = StyleSheet.create({
  menu_item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  textContainer: {
    flexShrink: 1,  // Allows shrinking if needed
    flexGrow: 1,    // Allows expansion if needed
    marginLeft: 10, // Spacing between icon and text
  },
  text_label: {
    fontSize: 14,
    color: "#000",
  }

});