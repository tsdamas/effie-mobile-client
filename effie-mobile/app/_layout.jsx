import { Drawer } from 'expo-router/drawer';
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from '@/components/CustomDrawer';
import ChatScreen from './index';
import SettingsScreen from './Settings';
import UserScreen from './user';

const DrawerNavigator = createDrawerNavigator();

export default function RootLayout() {
  return (
    <DrawerNavigator.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <DrawerNavigator.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }} />
      <DrawerNavigator.Screen name="Settings" component={SettingsScreen} />
      <DrawerNavigator.Screen name="User Profile" component={UserScreen} />
    </DrawerNavigator.Navigator>
  );
}
