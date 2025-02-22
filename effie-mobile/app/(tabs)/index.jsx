/**
 * This is our chat screen and will work as the "home" of the app for now.
 * 
 * We have to wrap this screen in a special view to make the contents
 *  scrollable when the keyboard appears in the screen.
 * 
 */

import { Text, View } from "react-native";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function Index() {
  return (

    <CustomKeyboardView>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </CustomKeyboardView>
     
  );
}
