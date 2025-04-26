// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import Constants from 'expo-constants';

// GoogleSignin.configure({
//   iosClientId: Constants.expoConfig.extra.GOOGLE_SIGNIN_IOS_CLIENT_ID,
//   webClientId: Constants.expoConfig.extra.GOOGLE_SIGNIN_CLIENT_ID, // Google OAuth Client ID
//   offlineAccess: true,
//   scopes: ['profile', 'email']
// });
// // console.log("Google Client ID:", process.env.GOOGLE_SIGNIN_CLIENT_ID);
// // console.log(typeof GoogleSignin.hasPlayServices); 
// export default async function signInWithGoogle() {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     const userInfo = await GoogleSignin.signIn();
//     //console.log("Google user raw result:", userInfo);
//     return userInfo;
//   } catch (error) {
//     console.error("Google Sign-In Error:", error);
//     throw error;
//   }
// }

