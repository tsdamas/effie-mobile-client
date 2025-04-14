import React from "react";
import { render, fireEvent, waitFor, getByTestId } from "@testing-library/react-native";
import ChatScreen from "@/app/(app)/Chat";
import { AuthContext } from "@/context/authContext";
import { getChunkedResponse } from "@/services/StreamService";


// Mock dependencies
jest.mock("@/services/StreamService", () => ({
  getChunkedResponse: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/StreamService", () => ({
  getChunkedResponse: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  useRoute: jest.fn(),
}));

describe("ChatScreen", () => {
  it("renders correctly when authenticated", () => {
    // Mock the route parameters
    const mockRoute = {
      params: {
        messages: [{ role: "user", content: "Hello" }],
        conversationId: "1",
      },
    };
    
    // Mock useRoute hook to return the mockRoute
    require("@react-navigation/native").useRoute.mockReturnValue(mockRoute);

    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <ChatScreen />
      </AuthContext.Provider>
    );

    expect(getByPlaceholderText("What is on your mind?")).toBeTruthy();
  });

  // ****************IGNORE/TO BE IMPLEMENTED********************************
  it("sends a message and updates the UI", async () => {
    // Mock the behavior of getChunkedResponse
    getChunkedResponse.mockImplementation((_, __, callback) => {
      callback("Test response from API");
    });
  
    // Render your component
    const { getByPlaceholderText, getByText, findByText, getByTestId } = render(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <ChatScreen />
      </AuthContext.Provider>
    );
  
    // Simulate typing a message
    const input = getByPlaceholderText("What is on your mind?");
    fireEvent.changeText(input, "Hello, bot!");
  
    // Simulate pressing the send button
    const sendButton = getByTestId('send-button'); 
    expect(sendButton).toBeTruthy();  
    fireEvent.press(sendButton);
  
    // Assert that the user message is displayed
    expect(await findByText("Hello, bot!")).toBeTruthy();
  
    // Wait for the response and assert that it's shown
    await waitFor(() => expect(getChunkedResponse).toHaveBeenCalled());
    expect(await findByText("Test response from API")).toBeTruthy();
  });
  
});
