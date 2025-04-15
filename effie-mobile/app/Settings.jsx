import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, Platform } from "react-native";
import { Text, List, Divider, Switch, Button, Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; 
import { useAuth } from "@/context/authContext";
import { deleteAccount } from "@/services/Authentication";
import { deleteAllConversations } from "@/services/GetConversations";

// import axios from "axios"; 


export default function SettingsScreen() {
  const [shareData, setShareData] = useState(false);
  const [loading, setLoading] = useState(true); 
  const theme = useTheme();
  const navigation = useNavigation();
  const { user, logout, triggerDrawerRefresh } = useAuth(); 

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // const response = await axios.get(``);
        // if(response.data?.share_data !== undefined) {
        //   setShareData(response.data.share_data); 

        // }
      } catch (error){
        console.error("Failed to fetch user preferences", error);

      } finally {
        setLoading(false); 
      }
    };

    fetchPreferences();
  }, []); 

  //update share data consent 
  const updateShareData = async (value) => {
    try {
      setShareData(value);
      // await axios.put(``, {share_data: value}); 
    } catch (error){
      console.log("Failed to update share data preference", error);
      Alert.alert("Error", "Could not update your preferences");
      setShareData((prev) => !value); 
    }
  };

  const confirmAction = (title, action) => {
    Alert.alert(
      title,
      `Are you sure you want to ${title.toLowerCase()}?`,
      [
        {text:"Cancel", style: "cancel"},
        {text: "Yes", onPress: action }, 
      ]
    );
  };

  const handleDeleteChats = () => { 
    console.log("Deleting all chats..."); 
    deleteAllConversations(user.user_id);
    triggerDrawerRefresh();
      // .then((response) => {
      //   if (response) {
      //     console.log("All conversations deleted successfully");
      //     Alert.alert("Warning", "All conversations deleted successfully");
      //     
      //   } else {
      //     console.log("Failed to delete all conversations");
      //   }
      // })
      // .catch((error) => {
      //   console.error("Error deleting conversations:", error);
      // });
  };

  const handleDeleteAccount = () => {
    console.log("Deleting all chats.."); 
    deleteAllConversations(user.user_id);      
    deleteAccount(user.user_id)
      // console.log("Account deleted successfully");
      // Alert.alert("Warning", "Account deleted successfully");
    logout();
  };


  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background }]}>
      {/* Top App Bar */}
      <Appbar.Header>

        <Appbar.BackAction onPress={() => navigation.goBack()}/>
          <Appbar.Content title="Settings"/>
      </Appbar.Header>

      <List.Section>
        <List.Item 
          title="Share data to improve Model"
          left={() => <List.Icon icon="cloud-upload-outline" />}
          right={() => 
            <Switch
              value={shareData}
              onValueChange={updateShareData}
              disabled={loading}
              />
          }
          description="Link with your health kit to share data"
        />
        <Divider/>
        <List.Item
          title="Delete all chats"
          left={() => <List.Icon icon="delete-outline" />}
          // onPress={() => confirmAction("Delete all chats", handleDeleteChats)}
          onPress={handleDeleteChats}
          description="This action will delete all your conversations"
          />
        <Divider/>
        <List.Item
          title="Delete account"
          left={() => <List.Icon icon="account-remove-outline" />}
          // onPress={() => confirmAction("Delete account", handleDeleteAccount)}
          onPress={handleDeleteAccount}
          description="This action will delete all your data"
          />
        
      </List.Section> 
    </View>
  );
}

// Styles for Settings Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 10 : 20,

  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
