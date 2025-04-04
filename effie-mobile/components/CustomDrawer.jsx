// /*     The CustomDrawer is a customizable side navigation menu that includes features like search,
//         new conversation creation, recent chats, and user information access. It helps users navigate 
//         through the app in a clean and organized manner. */

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import ButtonIcon from "./ButtonIcon";
import MenuItem from "./MenuItem";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from '@/context/authContext';
import { widthPercentageToDP as wp} from "react-native-responsive-screen";
import styles from "../assets/styles/CustomDrawerStyles";
import { createConversation, fetchConversations, fetchMessages } from "@/services/GetConversations";
import InputField from "./InputField";
import { copyStackTrace } from "@testing-library/react-native/build/helpers/errors";

const CustomDrawer = (props) => {

  const [isNewConversation, setIsNewConversation] = useState(false);
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [conversationList, setConversationList] = useState([]);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    // console.log(conversationList);
    if (user.user_id) {
      const makeConvList = async () => {
        let payload = {
          user_id: user.user_id
        };
        const convList = await fetchConversations(payload);
        if (convList) {
          setConversationList(convList);
        }
      }
  
      makeConvList();
    }
   
  }, []);

  const handleCreateConversation = async () => {
    if (newConversationTitle.trim() === "") {
      alert("Conversation title cannot be empty.");
      return;
    }

    const payload = {
      user_id: user.user_id,
      session_id: user.session_id,
      title: newConversationTitle,
    };


    const newConvId = await createConversation(payload);
    if (newConvId) {
      setConversationList((prevList) => [
        ...prevList,
        { 
          title: newConversationTitle,
          id: newConvId,
          user_id: user.user_id,
          session_id: user.session_id
        },
      ]);
      setIsNewConversation(false);  
      setNewConversationTitle("");    
    } else {
      alert("Failed to create conversation. Please try again.");
    }
  };

  const getMessageLists = async (convId, uId) => {
    const messages = await fetchMessages(convId, uId);
    if (messages) {
      //We pass the messages list to the chat screen
      props.navigation.navigate("Chat", { conversationId: convId, messages: messages });
    }
  }


  const createConversationList = () => {
    let payload = {
      user_id: user.user_id
    };
    return conversationList.map((conversation, index) => (
      <MenuItem
        key={index}
        onPress={() => getMessageLists(conversation.id, payload)}
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

  const openNewConversation = () => {
    setIsNewConversation(true);
  }

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
          onPress={openNewConversation}
          btnStyle={styles.newChatButton}
          btnSize={24}
          btnColor="black"
          iconName="create-outline"
        />
      </View>

      {isNewConversation && (
          <View style={styles.searchWrapper}>
            <InputField
              style={styles.newConversationForm}
              label=""
              value={newConversationTitle}
              onChangeText={setNewConversationTitle} 
              placeholder="Enter a title"
            />
            <ButtonIcon
              onPress={handleCreateConversation}
              btnStyle={styles.newConversationTitleButton}
              iconName="paper-plane-outline"
              btnSize={20}
              btnColor="black"
            />
          </View>
        )}

      {/* Recent Chats Section */}
      <View style={styles.chatList}>
        <Text style={styles.sectionTitle}>Your Conversations</Text>
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

