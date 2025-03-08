import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

const ios = Platform.OS == 'ios';

export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding': 'height'}
        style={styles.background}
    >
        {/* <LinearGradient
            colors={['#FFFFFF', '#006748']}
            style={styles.background}
        > */}
        <View style={styles.scrollContent}>
            {children}
        </View>    
        {/* </LinearGradient> */}
           
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    background: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

/* MAYBE THE NEXT CODE, BUT NO FOR NOW --- need to do that with Andres (juliana)
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './CustomKeyboardViewStyles'; // Importing styles from CustomKeyboardViewStyles.js

export default function CustomKeyboardView() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Custom Keyboard</Text>
      
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} placeholder="Type something..." />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
*/
