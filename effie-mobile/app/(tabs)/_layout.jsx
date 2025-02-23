import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChatHeader from '@/components/ChatHeader';


export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" 
                options={{ 
                    title: 'Chat',
                    header: () => <ChatHeader />,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'}
                            color={color} size={24} 
                        />
                    ),
                }} 
            />
            <Tabs.Screen name="user" 
                options={{ 
                    title: 'User Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person-sharp' : 'person-outline'}
                            color={color} size={24}
                        />
                    ),
                }} 
            />
        </Tabs>
    );
}