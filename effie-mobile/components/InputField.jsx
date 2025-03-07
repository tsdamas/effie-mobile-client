import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

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
}

// Default styles
const styles = StyleSheet.create({
  container: {
    width: "100%", // Ensure the container takes full width
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    width: "100%", // Ensure it stretches
    alignSelf: "stretch", // Makes sure it follows parent's width
  }
});

