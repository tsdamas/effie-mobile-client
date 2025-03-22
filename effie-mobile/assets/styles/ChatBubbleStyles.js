import { StyleSheet } from 'react-native';
import { Colors } from './colors';

/* const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',        
    padding: 10,            
    borderRadius: 20,       // Rounded corners for the bubble
    backgroundColor: 'e1e0e0',  
  },
  text: {
    fontSize: 16,           // Font size for the message text
    color: 'black',         
    textAlign: 'left',      // Align the text to the left
    flexWrap: 'wrap',       // Allow text to wrap
  },
}) */

  const styles = StyleSheet.create({
    userBubble: {
      alignSelf: 'flex-end',
      backgroundColor: Colors.primaryPurple,
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
      color: 'white',
      fontSize: 16,
    },
    assistantText: {
      color: Colors.darkGray,
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