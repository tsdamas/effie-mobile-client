import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomDrawer = (props) => {
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
        
        <TouchableOpacity onPress={() => {}} style={styles.newChatButton}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Recent Chats Section */}
      <View style={styles.chatList}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>

        <TouchableOpacity onPress={() => {}} style={styles.chatItem}>
          <Ionicons name="chatbubble-outline" size={20} color="black" />
          <Text style={styles.chatText}>Chat 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.chatItem}>
          <Ionicons name="chatbubble-outline" size={20} color="black" />
          <Text style={styles.chatText}>Chat 2</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.chatItem}>
          <Ionicons name="chatbubble-outline" size={20} color="black" />
          <Text style={styles.chatText}>Chat 3</Text>
        </TouchableOpacity>
      </View>

      {/* 👤 User Info and Settings Button */}
      <View style={styles.userInfo}>
        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }} style={styles.avatar} />
        
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>Juliana Nina</Text>
          
          <TouchableOpacity onPress={() => props.navigation.navigate("Settings")} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
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
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  chatText: {
    fontSize: 14,
    marginLeft: 10,
    color: "#000",
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
