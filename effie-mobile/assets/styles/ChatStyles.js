import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from './colors';

const ChatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  innerContainer: {
    flex: 1,  // Ensures the content takes up full height but does not overflow
    justifyContent: "flex-end",  // Ensures SendBox stays at the bottom
  },
  chatContainer: {
    flexGrow: 1, // Allows FlatList to shrink and not push SendBox off the screen
    paddingBottom: hp(2),
  },
});

export default ChatStyles;