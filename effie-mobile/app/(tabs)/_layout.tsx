/*import { Tabs } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import HamburgerMenu from "@/components/HamburgerMenu"; // Ensure correct path

const Drawer = createDrawerNavigator();

function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person-sharp" : "person-outline"} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <HamburgerMenu navigation={navigation} />,
      })}
    >
      <Drawer.Screen name="Tabs" component={TabLayout} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}*/


import { Stack } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";                         // Clickable button that we use to open the side menu

const Drawer = createDrawerNavigator();     // Create a drawer navigator that will be used to manage the side menu

function TabLayout({ navigation }: any) {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
            <Ionicons name="menu" size={28} color="black" />   
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "chatbubbles-sharp" : "chatbubbles-outline"} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "person-sharp" : "person-outline"} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={TabLayout} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
