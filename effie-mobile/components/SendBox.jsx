import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Button from './Button';


export default function SendBox() {
  return (
    <View style={styles.sendBoxContainer}>
      <TextInput
        style={styles.input} 
        placeholder="Write what is on your mind" 
        placeholderTextColor="#888" 
      />
      <Button iconName="send" style={styles.sendButton}>
        {/* <Ionicons name="send" size={24} color="#006748" /> */}
      </Button>
      <Button iconName="mic" style={styles.micButton}>
       {/* <Ionicons name="mic" size={24} color="#006748" /> */}
      </Button>
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
    width: wp(80),
    height: hp(7),
    paddingHorizontal: wp(0.2),
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
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  micButton: {
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2), 
  },
});
