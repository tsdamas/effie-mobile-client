import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'

const ios = Platform.OS == 'ios';

export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView
        behavior={ios? 'padding': 'height'}
        style={styles.flexify}
    >
        <ScrollView
            style={styles.flexify}
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = {
    flexify: {
        flex: 1,
    },
}