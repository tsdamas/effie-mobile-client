import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MenuItem from '@/components/MenuItem';
import { Colors } from '@/assets/styles/colors';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { useAuth } from '@/context/authContext';
import GoogleSignIn from '@/components/GoogleSignIn';
import * as SecureStore from 'expo-secure-store';


export default function SignIn() {

    const [loginOption, setLoginOption] = useState("none");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth();

    const switchLoginOption = (opt) => {
        setLoginOption(opt);
        // console.log(email);
        // console.log(password);
        console.log(opt);
    }

    const handleLogin = async () =>{
        login(email, password);

    }

    const handleGoogleSignIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const { idToken, user } = userInfo;
          const { givenName, familyName, email } = user;
    
          // Send the idToken to your backend for verification and further processing
          const response = await fetch("https://your-auth-service.com/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
          });
    
          const data = await response.json();
    
          if (data.access_token) {
            // Store JWT and user information securely
            await SecureStore.setItemAsync("jwt_token", data.access_token);
            await SecureStore.setItemAsync("user_email", email);
            await SecureStore.setItemAsync("user_first_name", givenName);
            await SecureStore.setItemAsync("user_last_name", familyName);
            console.log("JWT and user information stored securely");
          }
        } catch (error) {
          console.error("Google Sign-In Failed:", error);
        }
      };


console.log(Platform.OS);
    return (
        <View style={styles.sign_in_container}>
            {/* {console.log(loginOption)} */}
            <StatusBar style="dark" />
            {/* Log in text */}
            <View style={styles.sign_in_container}>
                <Text style={styles.header}>Login to your account</Text>
            </View>
            <View style={styles.login_buttons_container}>
                {loginOption=="none" ? (   
                    <>
                        <MenuItem
                            iconName="logo-apple"
                            onPress={() => switchLoginOption("apple")}
                            btnSize={28}
                            btnColor='white'
                            text="Continue with Apple"
                            textStyle={styles.login_label}
                            menuItemStyle={styles.login_button}
                        />

                        <MenuItem
                            iconName="logo-google"
                            onPress={handleGoogleSignIn}
                            btnSize={28}
                            btnColor='white'
                            text="Continue with Google"
                            textStyle={styles.login_label}
                            menuItemStyle={styles.login_button}
                        />

                        <MenuItem
                            iconName="mail"
                            onPress={() => switchLoginOption("email")}
                            btnSize={28}
                            btnColor='white'
                            text="Continue with Email"
                            textStyle={styles.login_label}
                            menuItemStyle={styles.login_button}
                        />
                        <Text style={styles.already_label}>
                            Don't have an account? Sign Up
                        </Text>
                    </>
              
                ):
                (
                    <>
                    <InputField 
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />

                    <InputField 
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity 
                    onPress={() => handleLogin()}
                    style={styles.login_button}>
                        <Text style={styles.login_label}>
                            Login
                        </Text>
                        <ButtonIcon
                            iconName="arrow-forward"
                            btnColor="white"
                            btnSize={28}
                            onPress={() => handleLogin()}
                        />
                    </TouchableOpacity>
                    </>
               
                )}
            </View>
            
        
        </View>
    );
}

const styles = StyleSheet.create({
    sign_in_container: {
        flex: 1,
        alignItems: 'stretch', 
        justifyContent: 'center',
        flexDirection: 'column',
        width: (Platform.OS !== 'web' ? "100%" : "auto"),
        paddingHorizontal: wp(5), 
        marginHorizontal: 'auto'
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 36,
        marginBottom: hp(2),
    },
    login_label: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        marginLeft: 3,
        color: 'white',
    },
    login_buttons_container: {
        flex: 2,
        flexDirection: 'column',
        // width: "100%", 
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp(2), 
    },
    login_button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5), 
        // width: "80%", 
        borderRadius: 50,
        backgroundColor: Colors.effie_green,
        alignSelf: "stretch", 
    },
    already_label: {
        color: 'gray',
        fontSize: 16,
        marginTop: hp(2)
    }
});
