import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChatHeader from '@/components/ChatHeader'; 
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from '@/components/CustomDrawer';
import SettingsScreen from '../Settings';

const Drawer = createDrawerNavigator();

// Tab Navigation inside Drawer
function TabLayout({ navigation }) {
    return (
        <Tabs>
            {/* Chat Tab */}
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: 'Chat',
                    header: () => <ChatHeader navigation={navigation} />, // ✅ Pass navigation here!
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }} 
            />
            
            {/* User Profile Tab */}
            <Tabs.Screen 
                name="user" 
                options={{ 
                    title: 'User Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons 
                            name={focused ? 'person-sharp' : 'person-outline'} 
                            color={color} 
                            size={24} 
                        />
                    ),
                }} 
            />
        </Tabs>
    );
}

// 🚀 Root Navigation: Drawer + Tabs
export default function RootLayout() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
            {/* Main Tab Navigation */}
            <Drawer.Screen name="Tabs" component={TabLayout} options={{ headerShown: false }} />

            {/* Add Settings Screen to Drawer */}
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
}
