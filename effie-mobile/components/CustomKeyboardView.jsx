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

// import { KeyboardAvoidingView, View, Platform, StyleSheet } from 'react-native';
// import React from 'react';

// const ios = Platform.OS === 'ios';

// export default function CustomKeyboardView({ children }) {
//   return (
//     <KeyboardAvoidingView
//       behavior={ios ? 'padding' : 'height'}
//       style={styles.background}
//     >
//       <View style={styles.content}>{children}</View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   content: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
// });
