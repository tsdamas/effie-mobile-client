import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';

GoogleSignin.configure({
  webClientId: "Client ID", // Google OAuth Client ID
  offlineAccess: true,
  scopes: ['profile', 'email']
});
// console.log("Google Client ID:", process.env.GOOGLE_SIGNIN_CLIENT_ID);
// console.log(typeof GoogleSignin.hasPlayServices); 
export default async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices();
    const user = await GoogleSignin.signIn();
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}