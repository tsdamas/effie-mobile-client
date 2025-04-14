import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

export async function signInWithApple() {
    if (Platform.OS !== 'ios') {
        console.warn("Apple Sign-In is only supported on iOS.");
        return null;
      }
      
    try{
        const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });

        const token = credential.identityToken;
        const firstName = credential.fullName?.givenName || '';
        const lastName = credential.fullName?.familyName;

        if(!token)
            throw new Error('No identity token returned');

        return {
            data: {
                token, 
                user: {email, firstName, lastName},
            },
        };
    }catch (error){
        console.error("Apple Sigin-in failed", error);
        throw error;
    }
}