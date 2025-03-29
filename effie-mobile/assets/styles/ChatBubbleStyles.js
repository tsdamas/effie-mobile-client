import { StyleSheet } from 'react-native';
import { Colors } from './colors';

  const styles = StyleSheet.create({
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: Colors.secondaryPurple,
      padding: 10,
      borderRadius: 16,
      borderTopRightRadius: 0,
      marginVertical: 4,
      marginRight: 10,
      maxWidth: '80%',
    },
    assistantBubble: {
      alignSelf: 'flex-start',
      backgroundColor: Colors.mediumGray,
      padding: 10,
      borderRadius: 16,
      borderTopLeftRadius: 0,
      marginVertical: 4,
      marginLeft: 10,
      maxWidth: '80%',
    },
    userText: {
      //color: 'white',
      //color: Colors.darkGray,
      color: 'black',
      fontSize: 16,
    },
    assistantText: {
      //color: Colors.darkGray,
      color: 'black',
      fontSize: 16,
    },
    ttsButton: {
      marginTop: 4,
      alignSelf: 'flex-end',
    },
    ttsButtonText: {
      fontSize: 18,
    },
  });

export default styles;