/**
 * In this file we will get the conversation list for the user.
 * 
 * For now we will just have a hard coded array
 * 
 */

const API_URL = 'http://127.0.0.1:8002/chat'; // Replace with your actual backend URL

// Hardcoded array for now
export const conversationList = [
    { title: "Chat 1" },
    { title: "Chat 2" },
    { title: "Chat 3" },
];

// Function to fetch the list of conversations from the backend API
export const fetchConversations = async () => {
    try {
        const response = await fetch(`${API_URL}/conversations/`);
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching conversations: ${response.statusText}`);
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Return the list of conversations from the API
        return data;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error;
    }
};

// Function to create a new conversation (POST request)
export const createConversation = async (conversationData) => {
    try {
        const response = await fetch(`${API_URL}/conversations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(conversationData),
        });
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Error creating conversation: ${response.statusText}`);
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Return the conversation ID
        return data.id;
    } catch (error) {
        console.error("Error creating conversation:", error);
        throw error;
    }
};

// Function to get a specific conversation by ID (GET request)
export const fetchConversation = async (conversationId) => {
    try {
        const response = await fetch(`${API_URL}/conversations/${conversationId}`);
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching conversation: ${response.statusText}`);
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Return the specific conversation
        return data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        throw error;
    }
};

// Function to create a new message for a conversation (POST request)
export const createMessage = async (messageData) => {
    try {
        const response = await fetch(`${API_URL}/messages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Error creating message: ${response.statusText}`);
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Return the newly created message
        return data;
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
};

// Function to fetch messages for a specific conversation (GET request)
export const fetchMessages = async (conversationId) => {
    try {
        const response = await fetch(`${API_URL}/conversations/${conversationId}/messages`);
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching messages: ${response.statusText}`);
        }
        
        // Parse the response JSON
        const data = await response.json();
        
        // Return the list of messages for the conversation
        return data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};
