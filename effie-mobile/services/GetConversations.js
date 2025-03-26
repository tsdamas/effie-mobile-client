/**
 * In this file we will get the conversation list for the user.
 * 
 * For now we will just have a hard coded array
 * 
 */

const API_URL = 'http://127.0.0.1:8002/chat';

// Hardcoded array for now
export const conversationList = [
    { title: "Chat 1" },
    { title: "Chat 2" },
    { title: "Chat 3" },
];

// This function gets all conversations, no matter the user, we need to configure to pass teh user_id
export const fetchConversations = async () => {
    try {
        const response = await fetch(`${API_URL}/conversations/`);
        
        if (!response.ok) {
            throw new Error(`Error fetching conversations: ${response.statusText}`);
        }
        
        const data = await response.json();
        
 
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
        

        if (!response.ok) {
            throw new Error(`Error creating conversation: ${response.statusText}`);
        }
        

        const data = await response.json();
        

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
        
        if (!response.ok) {
            throw new Error(`Error fetching conversation: ${response.statusText}`);
        }
        
        const data = await response.json();
    
        return data;
    } catch (error) {
        console.error("Error fetching conversation:", error);
        throw error;
    }
};

export const createMessage = async (messageData) => {
    try {
        const response = await fetch(`${API_URL}/messages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });
        
        if (!response.ok) {
            throw new Error(`Error creating message: ${response.statusText}`);
        }
    
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
};

export const fetchMessages = async (conversationId) => {
    try {
        const response = await fetch(`${API_URL}/conversations/${conversationId}/messages`);
        
        if (!response.ok) {
            throw new Error(`Error fetching messages: ${response.statusText}`);
        }
        
        const data = await response.json();
    
        return data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};
