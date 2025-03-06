import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import ButtonIcon from "./ButtonIcon";
import MenuItem from "./MenuItem";
import { Ionicons } from "@expo/vector-icons";
import { conversationList } from "@/services/GetConversations";

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

      {/* 👤 User Info and page navitgation Buttons */}
      <View style={styles.userInfo}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("User Profile")}
          style={styles.userNameContainer}  
        >
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }} style={styles.avatar} />
          
          <Text style={styles.userName}>Juliana Nina</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    padding: 15,
    alignItems: "center",
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
  },
  searchText: {
    marginLeft: 10,
    color: "#999",
    fontSize: 16,
  },
  newChatButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  chatList: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  settingsButton: {
    padding: 5,
  },
});
