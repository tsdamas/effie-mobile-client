/*     The CustomDrawer is a customizable side navigation menu that includes features like search,
        new conversation creation, recent chats, and user information access. It helps users navigate 
        through the app in a clean and organized manner. */

import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native";
//import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import ButtonIcon from "./ButtonIcon";
import MenuItem from "./MenuItem";
import { Ionicons } from "@expo/vector-icons";
import { conversationList } from "@/services/GetConversations";
import styles from './CustomDrawerStyles';

const CustomDrawer = (props) => {

  const createConversationList = () => {
    return conversationList.map((conversation, index) => (
      <MenuItem
        key={index}
        onPress={() => console.log(`${conversation.title} pressed`)}
        btnSize={20}
        btnColor="black"
        iconName="chatbubble-outline"
        text={conversation.title}
      />
    ));
  } 

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      
      {/* Drawer Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.drawerTitle}>Menu</Text>
      </View>

      {/* Search Bar and New Chat Button 
          We will leave the search bar icon as a placeholder for now,
          until we implement the search functionality
      */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search</Text>
        </View>
        
        <ButtonIcon
          onPress={() => {}}
          btnStyle={styles.newChatButton}
          btnSize={24}
          btnColor="black"
          iconName="create-outline">
        </ButtonIcon>
        
      </View>

      {/* Recent Chats Section */}
      {/* This would most likey be handled by a loop afte DB retrieval
          Will leave as is for now
      */}
      <View style={styles.chatList}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        { createConversationList() }
      </View>

      {/* User Info and page navitgation Buttons */}
      <View style={styles.userInfo}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("User Profile")}
          style={styles.userNameContainer}  
        >
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }} style={styles.avatar} />
          
          <Text style={styles.userName}>User Name</Text>
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
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;