import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ChatScreen from "@/app/(app)/Chat";
import { AuthContext } from "@/context/authContext";
import { getChunkedResponse } from "@/services/StreamService";
import { useRouter } from "expo-router";

jest.mock("@/services/StreamService", () => ({
  getChunkedResponse: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("ffmpeg-kit-react-native", () => ({
  FFmpegKit: {
    execute: jest.fn(),
  },
  ReturnCode: {
    SUCCESS: 0,
  },
}));

describe("ChatScreen", () => {
  it("renders correctly when authenticated", () => {
    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <ChatScreen />
      </AuthContext.Provider>
    );

    expect(getByPlaceholderText("What is on your mind?")).toBeTruthy();
  });

//   it("sends a message and updates the UI", async () => {
//     getChunkedResponse.mockImplementation((_, __, callback) => {
//       callback("Test response from API");
//     });

//     const { getByPlaceholderText, getByText, findByText } = render(
//       <AuthContext.Provider value={{ isAuthenticated: true }}>
//         <ChatScreen />
//       </AuthContext.Provider>
//     );

//     const input = getByPlaceholderText("What is on your mind?");
//     fireEvent.changeText(input, "Hello, bot!");

//     // Use findByTestId to wait for the send button
//     const sendButton = getByText("send-button");
//     fireEvent.press(sendButton);

//     // Ensure the sent message appears in the UI
//     expect(await findByText("Hello, bot!")).toBeTruthy();

//     // Wait for the API response and ensure it appears in the UI
//     await waitFor(() => expect(getChunkedResponse).toHaveBeenCalled());
//     expect(await findByText("Test response from API")).toBeTruthy();
//   });
});
