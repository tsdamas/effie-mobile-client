/**
 * This is our chat screen and will work as the "home" of the app for now.
 * 
 * We have to wrap this screen in a special view to make the contents
 *  scrollable when the keyboard appears in the screen.
 * 
 */

import { Text, View, StyleSheet } from "react-native";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Index() {
  return (

    <CustomKeyboardView>
      <Text style={styles.text}>Effie chat comming soon!</Text>
    </CustomKeyboardView>
     
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: hp(5),
    fontWeight: 'bold'
  }
});