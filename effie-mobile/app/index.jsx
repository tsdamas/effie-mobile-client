/**
 * This is our chat screen and will work as the "home" of the app for now.
 * 
 * We have to wrap this screen in a special view to make the contents
 *  scrollable when the keyboard appears in the screen.
 * 
 */

import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageList from "@/components/MessageList";
import SendBox from "@/components/SendBox";
import { getChunkedResponse } from "@/services/StreamService";

// export default function Index() {
//   const [messages, setMessages] = useState([]);
//   const flatListRef = useRef(null);
  
//   const handleSendMessage = (userText) => {
//     if (!userText.trim()) return;
  
//     let updatedHistory = [];
//     let payloadHistory = [];
  
//     if (messages.length === 0) {
//       // First message:
//       // - UI history gets: user message then an empty assistant placeholder.
//       // - Payload history gets exactly that.
//       updatedHistory = [
//         { role: "user", content: userText },
//         { role: "assistant", content: "" }
//       ];
//       payloadHistory = updatedHistory;
//     } else {
//       // Subsequent messages:
//       // - The UI conversation history already holds previous exchanges.
//       // - Append the new user message and a placeholder for the new assistant response.
//       updatedHistory = [
//         ...messages,
//         { role: "user", content: userText },
//         { role: "assistant", content: "" }
//       ];
//       // For payload, we use the conversation history so far (from previous exchanges)
//       // and do NOT include the new user message since it will be passed separately in "question".
//       payloadHistory = messages;
//     }
  
//     // Update state for UI (showing the new user message and placeholder)
//     setMessages(updatedHistory);
  
//     // Call the API with the new question and payload history as context.
//     getChunkedResponse(
//       userText,
//       payloadHistory,
//       (fullResponse) => {
//         // Replace the assistant placeholder with the API's full response.
//         setMessages((prev) => {
//           const newHistory = [...prev];
//           newHistory[newHistory.length - 1] = { role: "assistant", content: fullResponse };
//           return newHistory;
//         });
//       }
//     );
//   };
  

//   useEffect(() => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   }, [messages]);

//   return (
//     <CustomKeyboardView style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={({ item }) => <MessageList messages={[item]} />}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.chatContainer}
//       />
//       <SendBox onSendMessage={handleSendMessage} />
//     </CustomKeyboardView>
//   );
// }

export default function LoadingPage() {
  return (
    <View>
      <ActivityIndicator size="large" color="gray" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    paddingBottom: hp(2),
  },
});
