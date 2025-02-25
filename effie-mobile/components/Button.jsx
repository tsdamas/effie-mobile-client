//Reusable buttons, we could use FontAwesome here or Ionicons

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Button({iconName}) {
  return (
    <TouchableOpacity>
      <Ionicons name={iconName} size={24} color="#006748"></Ionicons>
    </TouchableOpacity>
  )
}