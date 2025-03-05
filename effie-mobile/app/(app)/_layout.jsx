import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatScreen from "./Chat";
import SettingsScreen from "../Settings";
import UserScreen from "../user";
import CustomDrawer from "@/components/CustomDrawer";
import ChatHeader from "@/components/ChatHeader";

const DrawerNavigator = createDrawerNavigator();

export default function _layout() {
  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{header: () => <ChatHeader />}}
    >
      <DrawerNavigator.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }} />
      <DrawerNavigator.Screen name="Settings" component={SettingsScreen} />
      <DrawerNavigator.Screen name="User Profile" component={UserScreen} />
    </DrawerNavigator.Navigator> 
  )
}