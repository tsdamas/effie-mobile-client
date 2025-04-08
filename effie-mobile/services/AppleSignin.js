import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

export async function signInWithApple() {
  // ✅ Only proceed if the platform is iOS and AppleAuth is available
  if (Platform.OS !== 'ios') {
    console.warn("Apple Sign-In is only supported on iOS.");
    return null;
  }

  const isAvailable = await AppleAuthentication.isAvailableAsync();
  if (!isAvailable) {
    console.warn("Apple Sign-In is not available on this iOS device.");
    return null;
  }

  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const token = credential.identityToken;
    const email = credential.email || ''; // ✅ fix missing variable
    const firstName = credential.fullName?.givenName  || '';
    const lastName = credential.fullName?.familyName || '';

    if (!token)
      throw new Error('No identity token returned');

    return {
      data: {
        token,
        user: { email, firstName, lastName },
      },
    };
  } catch (error) {
    console.error("Apple Sign-In failed", error);
    throw error;
  }
}