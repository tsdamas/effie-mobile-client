import { KeyboardAvoidingView, ScrollView, Platform, StyleSheet } from 'react-native'
import React from 'react'

const ios = Platform.OS == 'ios';

export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding': 'height'}
        style={styles.background}
    >
        <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>          
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