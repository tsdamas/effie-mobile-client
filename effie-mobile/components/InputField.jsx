//import { View, Text, TextInput, StyleSheet } from 'react-native'
import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './InputFieldStyles'

export default function InputField({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  keyboardType = "default", 
  style = {} 
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  )
};