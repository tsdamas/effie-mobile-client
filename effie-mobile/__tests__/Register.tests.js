import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Register from "@/app/Register";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/authContext", () => ({
  useAuth: jest.fn(),
}));

describe("Register Screen", () => {
  let mockRegister;
  let mockPush;

  beforeEach(() => {
    mockRegister = jest.fn();
    mockPush = jest.fn();
    useAuth.mockReturnValue({ register: mockRegister });
    useRouter.mockReturnValue({ push: mockPush });
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    expect(getByText("Create your account")).toBeTruthy();

    expect(getByPlaceholderText("Enter your name")).toBeTruthy();
    expect(getByPlaceholderText("Enter your last name")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();

    expect(getByText("Register")).toBeTruthy();
  });

  it("handles user input and register action", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Register />);

    fireEvent.changeText(getByPlaceholderText("Enter your name"), "John");
    fireEvent.changeText(getByPlaceholderText("Enter your last name"), "Doe");
    fireEvent.changeText(getByPlaceholderText("Enter your email"), "john.doe@example.com");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "password123");

    fireEvent.press(getByText("Register"));
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("John", "Doe", "john.doe@example.com", "password123");
    });
  });

  it("navigates to SignIn page when 'Sign In' is pressed", async () => {
    const { getByText } = render(<Register />);

    fireEvent.press(getByText("Sign In"));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/SignIn");
    });
  });

//   it("displays error message when registration fails", async () => {
//     const { getByText, getByPlaceholderText } = render(<Register />);

//     fireEvent.changeText(getByPlaceholderText("Enter your name"), "John");
//     fireEvent.changeText(getByPlaceholderText("Enter your last name"), "Doe");
//     fireEvent.changeText(getByPlaceholderText("Enter your email"), "john.doe@example.com");
//     fireEvent.changeText(getByPlaceholderText("Enter your password"), "password123");

//     useAuth.mockReturnValueOnce({
//       register: jest.fn().mockRejectedValue("Registration failed"),
//     });

//     fireEvent.press(getByText("Register"));

//     await waitFor(() => {
//       expect(getByText("Registration failed")).toBeTruthy();
//     });
//   });
});
