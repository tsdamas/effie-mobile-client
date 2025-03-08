import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  header: (top) => ({
    paddingTop: top,  
    paddingBottom: hp(1.5),  
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',  
    display: 'flex',
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'space-between',  
  }),
  menuButton: {
    paddingLeft: wp(2),
    paddingRight: wp(2),
  },
  headerText: {
    fontSize: hp(3),        // Font size relative to screen size
    color: '#006748',      // Dark green color for text
    fontWeight: 'bold',  
    flex: 1,               // Allow header text to take up the remaining space
  },
  userPictureWrapper: {
    paddingRight: wp(2),   // Padding for the image container
  },
  userPicture: {
    height: hp(4.3),  
    aspectRatio: 1,        // Make it a square (aspect ratio of 1)
    borderRadius: 100,    // Circle the image
  },
});

export default styles;