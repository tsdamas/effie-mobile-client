import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from './colors';

const styles = StyleSheet.create({
  sendBoxContainer: {
    position: 'relative',
    bottom: hp(2), 
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    height: hp(6.6),
    paddingHorizontal: wp(4),
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    },
  
  input: {
    flex: 1,
    fontSize: hp(2),
    color: Colors.darkGray,
    paddingHorizontal: wp(3),
  },

  sendButton: {
    marginLeft: wp(2),
  },

  micButton: {
    marginLeft: wp(2),
  },
});

export default styles;
