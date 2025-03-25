// /*     The CustomDrawer is a customizable side navigation menu that includes features like search,
//         new conversation creation, recent chats, and user information access. It helps users navigate 
//         through the app in a clean and organized manner. */

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import ButtonIcon from "./ButtonIcon";
import MenuItem from "./MenuItem";
import { Ionicons } from "@expo/vector-icons";
import { conversationList } from "@/services/GetConversations";
import { useAuth } from '@/context/authContext';
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import styles from "../assets/styles/CustomDrawerStyles";
import { createConversation } from "@/services/GetConversations";

const CustomDrawer = (props) => {
  const { user, logout } = useAuth();

  // console.log(`Custom drawer user! ${JSON.stringify(user)}`);

  const handleCreateConversation = async () => {
    const payload = {
      user_id: user.user_id,
      session_id: user.session_id,
      title: "test",
    }

    console.log(await createConversation(payload));

  }

  const createConversationList = () => {
    return conversationList.map((conversation, index) => (
      <MenuItem
        key={index}
        onPress={() => console.log(`${conversation.title} pressed`)}
        btnSize={20}
        btnColor="black"
        iconName="chatbubble-outline"
        text={conversation.title}
        menuItemStyle={styles.menuItem}
      />
    ));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Drawer Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>

      {/* Search Bar and New Chat Button */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search</Text>
        </View>

        <ButtonIcon
          onPress={handleCreateConversation}
          btnStyle={styles.newChatButton}
          btnSize={24}
          btnColor="black"
          iconName="create-outline"
        />
      </View>

      {/* Recent Chats Section */}
      <View style={styles.chatList}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        {createConversationList()}
      </View>

      {/* User Info and Navigation Buttons */}
      <View style={styles.userInfo}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("User Profile")}
          style={styles.userNameContainer}
        >
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user.first_name + " " + user.last_name}</Text>
        </TouchableOpacity>
        <ButtonIcon
          onPress={() => props.navigation.navigate("Settings")}
          btnStyle={styles.settingsButton}
          iconName="settings-outline"
          btnSize={20}
          btnColor="black"
        />
        <ButtonIcon
          onPress={() => props.navigation.navigate("Chat")}
          btnStyle={styles.settingsButton}
          iconName="chatbubbles-outline"
          btnSize={20}
          btnColor="black"
        />
      </View>

      {/* Logout Button */}
      <MenuItem
        onPress={handleLogout}
        btnStyle={styles.logoutButton}
        iconName="log-out"
        btnSize={20}
        btnColor="white"
        text="Logout"
        menuItemStyle={styles.menuItem}
        textStyle={styles.userName}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

