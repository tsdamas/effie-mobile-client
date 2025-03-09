import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,                              // Ensures the container takes up full space
    padding: 10,                         // Adds padding inside the container
  },
  bubbleContainer: {
    width: '100%',      
    flexDirection: 'row',               // Makes the bubble container a row for chat messages
    marginVertical: 4,                 // Adds vertical spacing between chat bubbles
  },
  userContainer: {
    justifyContent: 'flex-end',       // Aligns the user's message to the right
  },
  aiContainer: {
    justifyContent: 'flex-start',    // Aligns the AI's message to the left
  },
});

export default styles;
