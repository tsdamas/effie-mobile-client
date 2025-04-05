import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';

export async function signInWithApple() {
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