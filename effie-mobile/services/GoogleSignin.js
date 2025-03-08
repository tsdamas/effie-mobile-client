import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_SIGNIN_CLIENT_ID, // Google OAuth Client ID
  offlineAccess: true,
  scopes: ['profile', 'email']
});

export default async function GoogleSignIn() {
  try {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}