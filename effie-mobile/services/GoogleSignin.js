import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';

GoogleSignin.configure({
  webClientId: Constants.expoConfig.extra.GOOGLE_SIGNIN_CLIENT_ID, // Google OAuth Client ID
  iosClientId: Constants.expoConfig.extra.GOOGLE_SIGNIN_IOS_CLIENT_ID,
  offlineAccess: true,
  scopes: ['profile', 'email']
});
// console.log("Google Client ID:", process.env.GOOGLE_SIGNIN_CLIENT_ID);
// console.log(typeof GoogleSignin.hasPlayServices); 
export default async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    console.log("Google user raw result:", userInfo);
    return userInfo;
  } catch (error) {
    Alert.alert(
      'Sign-In Error',
      'There was a problem signing in with Google. Please try again later.',
      [{ text: 'OK' }]
    );
    console.error("Google Sign-In Error:", error);
    throw error;
  }
}

