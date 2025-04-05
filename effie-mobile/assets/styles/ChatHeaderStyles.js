import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from './colors';

const styles = StyleSheet.create({
  header: (top) => ({
    paddingTop: top,
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: Colors.lightGray , 
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  menuButton: {
    padding: wp(2),
  },
  headerText: {
    fontSize: hp(3.2),
    color: Colors.primaryPurple, 
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  logoWrapper: {
    paddingRight: wp(2),
  },
  logoImage: {
    height: hp(5),
    aspectRatio: 1,
    borderRadius: 100,
  },
});

export default styles;