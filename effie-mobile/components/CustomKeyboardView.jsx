import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

const ios = Platform.OS == 'ios';

export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding': 'height'}
        style={styles.background}
    >
        <LinearGradient
            colors={['#FFFFFF', '#006748']}
            style={styles.background}
        >
             <ScrollView
                style={styles.transparentBg}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>        
        </LinearGradient>
           
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
    transparentBg: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
});