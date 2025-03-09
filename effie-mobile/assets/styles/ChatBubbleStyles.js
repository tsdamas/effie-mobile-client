import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',        
    padding: 10,            
    borderRadius: 10,       // Rounded corners for the bubble
    backgroundColor: '#e4e4e4',  
  },
  text: {
    fontSize: 16,           // Font size for the message text
    color: 'black',         
    textAlign: 'left',      // Align the text to the left
    flexWrap: 'wrap',       // Allow text to wrap
  },
});

export default styles;