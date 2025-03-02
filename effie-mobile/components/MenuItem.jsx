//Icons + label for tab menu or hidden hamburger menu
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ButtonIcon from './ButtonIcon'


export default function MenuItem({ iconName, onPress, btnSize, btnStyle, btnColor, text }) {
  
  return (
    <TouchableOpacity style={styles.menu_item} onPress={onPress}>
      <ButtonIcon
          btnStyle={btnStyle}
          btnSize={btnSize}
          btnColor={btnColor}
          iconName={iconName}
      />
      <Text style={styles.text_label}>
        {text}
      </Text>
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
  text_label: {
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
  }

});