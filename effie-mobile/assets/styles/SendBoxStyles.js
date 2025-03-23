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

    /* position: 'relative',
    bottom: hp(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    //width: wp(80),
    width: wp(90),
    //height: hp(7),
    //paddingHorizontal: wp(0.2),
    paddingHorizontal: wp(3),
    //paddingVertical: hp(1.5),
    paddingVertical: hp(1),
    //backgroundColor: 'white',
    backgroundColor: '#fff',
    //borderRadius: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',    // the input box doesnt move anymore!!! =] */
  },
  
  input: {
    flex: 1,
    fontSize: hp(2),
    color: Colors.darkGray,
    paddingHorizontal: wp(3),

    /*
    //height: hp(6),
    height: hp(5.5),
    //backgroundColor: '#f0f0f0',
    backgroundColor: Colors.lightGray,
    //borderRadius: 20,
    borderRadius: 16,
    //paddingHorizontal: wp(2),
    paddingHorizontal: wp(4),
    fontSize: hp(2),
    //color: 'black',
    color: Colors.darkGray,
    flex: 1, */
  },

  sendButton: {
    marginLeft: wp(2),

    /*
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    //marginLeft: wp(4),
    marginLeft: wp(3),
    backgroundColor: 'transparent', */
  },

  micButton: {
    marginLeft: wp(2),

    /*
    borderRadius: 30,
    width: hp(5),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
    backgroundColor: 'transparent',*/
  },
});

export default styles;
