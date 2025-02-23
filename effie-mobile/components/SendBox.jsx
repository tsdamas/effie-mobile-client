import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

export default function SendBox() {
  return (
    <View style={styles.sendBoxContainer}>
      <TextInput
        style={styles.input} 
        placeholder="Type a message..." 
        placeholderTextColor="#888" 
      />
      <TouchableOpacity style={styles.sendButton}>
        {/* <Ionicons name="send" size={24} color="#006748" /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sendBoxContainer: {
    position: 'absolute',
    bottom: hp(1.2), 
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(95),
    height: hp(7),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1.5),
    backgroundColor: 'white', 
    borderRadius: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
  },
  input: {
    height: hp(6),
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: wp(2),
    fontSize: hp(2),
    color: 'black',
    flex: 1,
  },
  sendButton: {
    borderRadius: 50,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },
});
