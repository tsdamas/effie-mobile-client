import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '@/app/SignIn';
import { useAuth } from '@/context/authContext';
import signInWithGoogle from '@/services/GoogleSignin';
import * as SecureStore from 'expo-secure-store';

// Mock dependencies
jest.mock('@/context/authContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/services/GoogleSignin', () => jest.fn());

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('SignIn Screen', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Login to your account')).toBeTruthy();
    expect(getByText('Continue with Google')).toBeTruthy();
    expect(getByText("Don't have an account?")).toBeTruthy();
  });

  it('switches to email login form when "Continue with Email" is pressed', () => {
    const { getByText, getByPlaceholderText } = render(<SignIn />);
    
    fireEvent.press(getByText('Continue with Email'));

    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  // it('validates incorrect email format in forgot password', () => {
  //   const { getByText, getByPlaceholderText, getByTestId } = render(<SignIn />);

  //   fireEvent.press(getByText('Continue with Email'));    
  //   fireEvent.press(getByText('Forgot Password?'));
    
  //   const emailInput = getByPlaceholderText('Email address');
  //   fireEvent.changeText(emailInput, 'invalidemail');
    
  //   fireEvent.press(getByText('Continue'));

  //   expect(getByText('Incorrect email')).toBeTruthy();
  // });

  it('calls login function with correct email and password', () => {
    const mockLogin = jest.fn();
    useAuth.mockReturnValue({ login: mockLogin });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    
    fireEvent.press(getByText('Continue with Email'));

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');

    fireEvent.press(getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  // it('handles Google sign-in and stores token', async () => {
  //   signInWithGoogle.mockResolvedValue({
  //     idToken: 'mockToken',
  //     user: { givenName: 'John', familyName: 'Doe', email: 'john@example.com' },
  //   });

  //   global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve({ access_token: 'mockJwtToken' }),
  //     })
  //   );

  //   const { getByText } = render(<SignIn />);
  //   fireEvent.press(getByText('Continue with Google'));

  //   await waitFor(() => {
  //     expect(SecureStore.setItemAsync).toHaveBeenCalledWith('jwt_token', 'mockJwtToken');
  //     expect(SecureStore.setItemAsync).toHaveBeenCalledWith('user_email', 'john@example.com');
  //   });
  // });

  it('calls login function with correct email and password', () => {
    const mockLogin = jest.fn();
    useAuth.mockReturnValue({ login: mockLogin });

    const { getByPlaceholderText, getByText } = render(<SignIn />);
    
    fireEvent.press(getByText('Continue with Email'));

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'customer@effie.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'letmein');

    fireEvent.press(getByText('Login'));
    
    expect(mockLogin).toHaveBeenCalledWith('customer@effie.com', 'letmein');
  });

  // it('displays an error when Google sign-in fails', async () => {
  //   signInWithGoogle.mockRejectedValue(new Error('Google Sign-In Failed'));

  //   const { getByText } = render(<SignIn />);
  //   fireEvent.press(getByText('Continue with Google'));

  //   await waitFor(() => {
  //     expect(console.error).toHaveBeenCalledWith('Google Sign-In Failed:', expect.any(Error));
  //   });
  // });
});
