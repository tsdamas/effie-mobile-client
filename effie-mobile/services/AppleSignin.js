import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { jwtDecode } from 'jwt-decode'; 
import { useSyncExternalStore } from 'react';
import * as SecureStore from 'expo-secure-store';

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
        if(!token)
            console.warn("No identity token returned"); 
        const decode = jwtDecode(token);
        console.warn(credential);

        let email = credential.email || decode.email || ''; 
        let firstName = credential.fullName?.givenName || '';
        let lastName = credential.fullName?.familyName || '';
        console.warn(email);

        //Save on storage if available on first login 
        if(credential.email) await SecureStore.setItemAsync("email", credential.email);
        if(firstName) await SecureStore.setItemAsync("first_name", firstName);
        if(lastName) await SecureStore.setItemAsync("last_anme", lastName);

        //Fallbacks
        if(!email) email = await SecureStore.getItemAsync("email");
        if(!firstName) firstName = await SecureStore.getItemAsync("first_name");
        if(!lastName) lastName = await SecureStore.getItemAsync("last_name");
        

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