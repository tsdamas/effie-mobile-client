/**
 * This is our chat screen and will work as the "home" of the app for now.
 * 
 * We have to wrap this screen in a special view to make the contents
 *  scrollable when the keyboard appears in the screen.
 * 
 */

import React, { useState, useRef, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageList from "@/components/MessageList";
import SendBox from "@/components/SendBox";
import { getChunkedResponse } from "@/services/StreamService";
import { useAuth } from '@/context/authContext';
import { createMessage, fetchMessages } from "@/services/GetConversations";
import { useRoute } from "@react-navigation/native";

import styles from '@/assets/styles/ChatStyles';

export default function ChatScreen() {

  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [convId, setConvId] = useState('');
  const flatListRef = useRef(null);

  const { user } = useAuth();

  const handleSendMessage = (userText) => {
    console.log(`Conversation ID: ${convId}`);
    if (!userText.trim()) return;
  
    let updatedHistory = [];
    let payloadHistory = [];
  
    if (messages.length === 0) {
      // First message:
      // - UI history gets: user message then an empty assistant placeholder.
      // - Payload history gets exactly that.
      updatedHistory = [
        { role: "user", content: userText },
        { role: "assistant", content: "" }
      ];
      payloadHistory = updatedHistory;
    } else {
      // Subsequent messages:
      // - The UI conversation history already holds previous exchanges.
      // - Append the new user message and a placeholder for the new assistant response.
      updatedHistory = [
        ...messages,
        { role: "user", content: userText },
        { role: "assistant", content: "" }
      ];
      // For payload, we use the conversation history so far (from previous exchanges)
      // and do NOT include the new user message since it will be passed separately in "question".
      payloadHistory = messages;
    }

    //Log the user message
    logLastMsg("user", userText );
  
    // Update state for UI (showing the new user message and placeholder)
    setMessages(updatedHistory);
  
    // Call the API with the new question and payload history as context.
    getChunkedResponse(
      userText,
      payloadHistory,
      (fullResponse) => {
        // Replace the assistant placeholder with the API's full response.
        setMessages((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { role: "assistant", content: fullResponse };
          //We log the assistant message
          logLastMsg("assistant", fullResponse);
          // console.log(`Messages list: \n${JSON.stringify(newHistory)}`);
          return newHistory;
        });
      }
    );

  };

  const logLastMsg = (msgRole, msgContent) => {
    if (convId) {
      
      const messageData = {
        conversation_id: convId,
        msg_role: msgRole,
        msg_content: msgContent
      }
      createMessage(messageData);
    }
  }
  
  useEffect(() => {
    //on chat screen load we populate the messages of the conversation they click on
  }, []);

  useEffect(() => {
    if (route.params?.messages) {
      // console.log("Got messages from db: \n" + JSON.stringify(route.params.messages));
      // let formattedMessages = JSON.parse(route.params.messages);
      setMessages(() => {
        const returnedMessages = route.params.messages.map((msg) => {
          // console.log(msg);
          return ({role: msg.msg_role, content: msg.msg_content}); 
        });
        // console.log("Attempted to map: " + returnedMessages);
        return returnedMessages;
      });
    }
  }, [route.params?.messages]);

  useEffect(() => {
    if (route.params?.conversationId) {
      setConvId(route.params.conversationId);
    }
  }, [route.params?.conversationId]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
    console.log(`Messages have changed! \n${JSON.stringify(messages)}`);
  }, [messages]);

  return (
    <CustomKeyboardView style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageList messages={[item]} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />
        <SendBox onSendMessage={handleSendMessage} />
      </View>
    </CustomKeyboardView>
  );
};