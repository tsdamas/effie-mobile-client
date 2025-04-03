import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';

GoogleSignin.configure({
  webClientId: "265919234230-vkiu96oicru9jlu3epb6elt6k0k1umek.apps.googleusercontent.com", // Google OAuth Client ID
  offlineAccess: true,
  scopes: ['profile', 'email']
});
// console.log("Google Client ID:", process.env.GOOGLE_SIGNIN_CLIENT_ID);
// console.log(typeof GoogleSignin.hasPlayServices); 
export default async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    //console.log("Google user raw result:", userInfo);
    return userInfo;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}

