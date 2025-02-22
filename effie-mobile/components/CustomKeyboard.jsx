import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { Children } from 'react'

const ios = Platform.OS == 'ios';

export default function CustomKeyboard() {
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
                Children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = {
    flexify: {
        flex: 1,
    },
}