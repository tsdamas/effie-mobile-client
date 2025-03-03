import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from '@/components/CustomDrawer';
import ChatScreen from './index';
import SettingsScreen from './Settings';
import UserScreen from './user';
import ChatHeader from "@/components/ChatHeader";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const DrawerNavigator = createDrawerNavigator();

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //Check if user is Authenticated or not
    if (typeof isAuthenticated=='undefined') return;

    const inApp = segments[0] =="app";

    if (isAuthenticated && !inApp) {
      // redirect to chat
      router.replace("/(app)/Chat");
    } else if(!isAuthenticated) {
      //redirect to signIn
      router.replace("/SignIn");
    }
  }, [isAuthenticated]);

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
      {/* <DrawerNavigator.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{header: () => <ChatHeader />}}
      >
        <DrawerNavigator.Screen name="Chat" component={ChatScreen} options={{ headerShown: true }} />
        <DrawerNavigator.Screen name="Settings" component={SettingsScreen} />
        <DrawerNavigator.Screen name="User Profile" component={UserScreen} />
      </DrawerNavigator.Navigator> */}
    </AuthContextProvider>
  );
}
