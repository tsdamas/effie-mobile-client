import { StyleSheet } from 'react-native';
import { Colors } from './colors';

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',        
    padding: 10,            
    borderRadius: 20,       // Rounded corners for the bubble
    backgroundColor: Colors.secondaryPurple,  
  },
  text: {
    fontSize: 16,           // Font size for the message text
    color: 'black',         
    textAlign: 'left',      // Align the text to the left
    flexWrap: 'wrap',       // Allow text to wrap
  },
});

export default styles;