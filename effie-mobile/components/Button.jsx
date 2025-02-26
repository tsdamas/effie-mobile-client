//Reusable buttons, we could use FontAwesome here or Ionicons

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Button({ iconName, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={iconName} size={24} color="#006748" />
    </TouchableOpacity>
  );
}