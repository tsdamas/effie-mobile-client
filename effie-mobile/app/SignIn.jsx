import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import MenuItem from '@/components/MenuItem';
import { Colors } from '@/assets/styles/colors';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { useAuth } from '@/context/authContext';
import signInWithGoogle from '@/services/GoogleSignin';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

function SignIn() {
    const [loginOption, setLoginOption] = useState("none");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const router = useRouter();

    const switchLoginOption = (opt) => {
        setLoginOption(opt);
        // console.log(opt);
    };

    const handleLogin = async () => {
        login(email, password);
    };

    const handleSendInstructions = async () => {
        try {
            //connect to backend
            const response = await fetch("http://127.0.0.1:8000/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Clear any errors
                setErrorMessage("");
                // Popup msg
                Alert.alert(
                    "Please check your Email for instructions on how to reset your password, it may take a few minutes to arrive.",
                    [{ text: "OK" }]
                );
            } else {
                setErrorMessage(data.message || "Invalid email, please try again."); // Change this so you don't actually expose emails
            }

        } catch (error) {
            Alert.alert("Something went wrong")
        }
    };

    const handleGoogleSignIn = async () => {
        try {

            const userInfo = await signInWithGoogle();
            //used a optional chaining operator in case the data comes null or undefinied
            const { idToken, user } = userInfo?.data || {};
            if (!user) {
              console.warn("No user object returned from Google Sign-In.");
              return;
            }
        
            const { givenName, familyName, email } = user;

            //console.log("User details:", givenName, familyName, email);

            // Send the idToken to your backend for verification and further processing
            const response = await fetch("http://10.0.2.2:8000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: idToken }),
            });

    
            const text = await response.json();

    
            if (text.session_id) {
                // Store JWT and user information securely
                await SecureStore.setItemAsync("session_id", text.session_id);
                await SecureStore.setItemAsync("user_email", email);
                await SecureStore.setItemAsync("user_first_name", givenName);
                await SecureStore.setItemAsync("user_last_name", familyName);
                console.log("Sesion id and user information stored securely");

                console.log("User signed in with Google and session stored.");

                // go to  chat screen
                router.push("/Chat");
            }
        } catch (error) {
            console.error("Google Sign-In Failed:", error);
        }
    };


    //console.log(Platform.OS);
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            {!showForgotPassword ? (
                <>
                    {/* ----- LOGIN UI ----- */}
                    <Text style={styles.header}>Login to your account</Text>

                    <View style={styles.login_buttons_container}>
                        {loginOption === "none" ? (
                            <>
                                <MenuItem
                                    iconName="logo-apple"
                                    onPress={() => switchLoginOption("apple")}
                                    btnSize={28}
                                    btnColor="white"
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
                                    btnColor="white"
                                    text="Continue with Email"
                                    textStyle={styles.login_label}
                                    menuItemStyle={styles.login_button}
                                />
                                <View style={styles.signin_upContainer}>
                                    <Text style={styles.already_label}>
                                        Don't have an account?
                                    </Text>
                                    <Pressable
                                        onPress={() => router.push('/Register')}
                                    >
                                        <Text style={styles.importantText}>
                                            Sign Up
                                        </Text>
                                    </Pressable>
                                </View>
                            </>
                        ) : (
                            // log in UI
                            <>
                                <View style={styles.inputContainer}>
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
                                </View>

                                <TouchableOpacity
                                    onPress={handleLogin}
                                    style={styles.login_button}
                                >
                                    <Text style={styles.login_label}>Login</Text>
                                    <ButtonIcon
                                        iconName="arrow-forward"
                                        btnColor="white"
                                        btnSize={28}
                                        onPress={handleLogin}
                                    />
                                </TouchableOpacity>

                                {/* Back to login */}
                                <TouchableOpacity
                                    onPress={() => switchLoginOption("none")}
                                    style={styles.forgotButton}
                                >
                                    <Text style={styles.importantText}>Other login options</Text>
                                </TouchableOpacity>

                                {/* Forgot password button */}
                                <TouchableOpacity
                                    onPress={() => setShowForgotPassword(true)}
                                    style={styles.forgotButton}
                                >
                                    <Text style={styles.importantText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </>
            ) : (
                <>
                    {/* ----- FORGOT PASSWORD UI ----- */}
                    <Text style={styles.header}>Reset your password</Text>
                    <Text style={styles.description}>
                        Enter your Email address and we will send you instructions on how to reset your password.
                    </Text>

                    <View style={styles.inputContainer}>
                        {/* Show error message if present */}
                        {errorMessage ? (
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        ) : null}

                        <InputField
                            label="Email address*"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email address"
                            keyboardType="email-address"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.login_button}
                        onPress={handleSendInstructions}
                    >
                        <Text style={styles.login_label}>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setShowForgotPassword(false)}
                        style={styles.backToLoginButton}
                    >
                        <Text style={styles.importantText}>Back to Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View >
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        justifyContent: 'center',
        marginHorizontal: 'auto',
        width: Platform.OS !== 'web' ? '100%' : 'auto',
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 36,
        marginBottom: hp(2),
    },
    login_buttons_container: {
        marginTop: hp(2),
        alignItems: 'center',
    },
    login_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(5),
        borderRadius: 50,
        backgroundColor: Colors.effie_green,
        alignSelf: 'stretch',
        marginTop: hp(2),
    },
    login_label: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        marginLeft: 3,
        color: 'white',
    },
    already_label: {
        color: 'gray',
        fontSize: hp(1.8)
    },
    inputContainer: {
        width: '100%',
        marginTop: hp(2),
    },
    forgotButton: {
        marginTop: hp(2),
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginHorizontal: wp(5),
        marginBottom: hp(2),
    },
    backToLoginButton: {
        marginTop: hp(2),
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: hp(1),
        textAlign: 'center',
    },
    importantText: {
        color: Colors.effie_green,
        textDecorationLine: 'underline',
        fontSize: hp(1.8),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    signin_upContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        gap: wp(1),
        marginTop: hp(3),
        textAlign: 'center',
    }
});
export default SignIn;