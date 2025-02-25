import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>

      {/* Drawer Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.drawerTitle}>Effie</Text>
      </View>
      
      <View style={styles.searchWrapper}> 
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <Text style={styles.searchText}>Search</Text>
        </View>

        {/* Button to Start a New Chat */}
        <TouchableOpacity onPress={() => {}} style={styles.newChatButton}>
          <Ionicons name="create-outline" size={24} color="black" />
        </TouchableOpacity>
       </View>

        {/* Default Drawer Items */}
        <View style={styles.drawerItems}>
            <DrawerItemList {...props} />
        </View>

        {/* 🔹 Chat Labels Section */}
        <View style={styles.chatList}>
          <Text style={styles.sectionTitle}>Recent Chats</Text>

          {/* 🔹 List of Chat Labels */}
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


        {/* User Info Section at the bottom */}
        <View style={styles.userInfo}>
          {/* Profile Picture */}
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }} 
            style={styles.avatar} 
          />

          {/* User Name */}
          <Text style={styles.userName}>User Name</Text>

          {/* Settings Button (Right Side) */}
          <TouchableOpacity 
            onPress={() => props.navigation.navigate("Settings")} // Navigate to Settings Screen
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={24} color="black" />
          </TouchableOpacity>
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
    padding: 15,         // Add space around the title
    alignItems: "center", // Center the title
  },
  
  drawerTitle: {
    fontSize: 20,        
    fontWeight: "bold",  
    color: "#333",       // Darker text for visibility
  },

  searchWrapper: {
    flexDirection: "row",  // Align items in a row
    alignItems: "center",  // Center vertically
    paddingHorizontal: 10, // Add some space around
    marginBottom: 10,      // Space below
  },

  searchContainer: {
    flex: 1,               // Take up remaining space
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

  drawerItems: {
    flex: 1,
  },

  chatList: {
    marginTop: 10,        // Add spacing above the list
    paddingHorizontal: 15, // Side padding for alignment
  },
  
  sectionTitle: {
    fontSize: 16,        
    fontWeight: "bold",  
    marginBottom: 5,     // Space between title and first item
    color: "#333",
  },
  
  chatItem: {
    flexDirection: "row",  // Align icon and text in a row
    alignItems: "center",  // Center vertically
    paddingVertical: 10,   // Add vertical padding for better spacing
  },
  
  chatText: {
    fontSize: 14,   
    marginLeft: 10, // Space between icon and text
    color: "#000",
  },

  userInfo: {
    flexDirection: "row",  // Arrange elements in a row (horizontal)
    alignItems: "center",  // Align elements vertically
    justifyContent: "space-between", // Push items apart (Avatar on left, Settings on right)
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  
  avatar: {
    width: 40,  
    height: 40, 
    borderRadius: 20, // Make it circular
  },
  
  userName: {
    flex: 1,  // Allow text to take up space and push settings button to the right
    fontSize: 16, 
    fontWeight: "bold", 
    marginLeft: 10,  // Add space between avatar and name
  },
  
  settingsButton: {
    padding: 10,  // Increase touchable area for better UX
  },
  

  newChatButton: {
  marginLeft: 10, // Add spacing from the search bar
  padding: 10,    // Increase touchable area
  backgroundColor: "#f0f0f0",
  borderRadius: 8,
  },

});
