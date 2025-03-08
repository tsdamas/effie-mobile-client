import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  sendBoxContainer: {
    position: 'relative',
    bottom: hp(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(80),
    height: hp(7),
    paddingHorizontal: wp(0.2),
    paddingVertical: hp(1.5),
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
  input: {
    height: hp(6),
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: wp(2),
    fontSize: hp(2),
    color: 'black',
    flex: 1,
  },

  sendButton: {
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(4),
  },

  micButton: {
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
  },
});

export default styles;
