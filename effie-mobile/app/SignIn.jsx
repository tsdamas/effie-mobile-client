import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import MenuItem from '@/components/MenuItem';
import { Colors } from '@/assets/styles/colors';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { useAuth } from '@/context/authContext';
import signInWithGoogle from '@/services/GoogleSignin';
import signInWithApple from '@/services/AppleSignin';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

import styles from '@/assets/styles/SignInStyles'

function SignIn() {
    const [loginOption, setLoginOption] = useState("none");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetStep, setResetStep] = useState("email");
    const [securityCode, setSecurityCode] = useState("");


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
            const response = await fetch("http://10.0.2.2:8000/auth/forgot-password", {
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
                console.log("Redirecting to code screen");
                setResetStep("code");

            } else {
                setErrorMessage(data.message || "Invalid email, please try again."); // Change this so you don't actually expose emails
            }

        } catch (error) {
            Alert.alert("Something went wrong")
        }
    };

    //verifying code for pw reset
    const handleVerifyCode = async () => {
        console.log("code verification");
        try {
            const response = await fetch("http://10.0.2.2:8000/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: securityCode }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Code verified! You can now reset your password.");
                router.push({ pathname: "/ResetPassword", params: { email } });

                //navigate to password reset screen
            } else {
                setErrorMessage(data.message || "Invalid code, please try again.");
            }
        } catch (error) {
            Alert.alert("Something went wrong");
        }
    };


    const handleGoogleSignIn = async () => {
        try {

            const userInfo = await signInWithGoogle();
            //used a optional chaining operator in case the data comes null or undefinied
            const { idToken, user } = userInfo?.data || {};
            console.warn(userInfo);

            if (!user) {
                console.warn("No user object returned from Google Sign-In.");
                return;
            }

            const { givenName, familyName, email } = user;

            //console.log("User details:", givenName, familyName, email);

            // Send the idToken to your backend for verification and further processing
            const response = await fetch("http://127.0.0.1:8000/auth/google", {
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

    const handleAppleSignin = async () => {
        try {
            const userAppleInfo = await signInWithApple();
            console.warn(userAppleInfo);
            const { token, user } = userAppleInfo?.data || {};
            //console.warn(token); 


            if (!token) {
                console.warn("No warm found in Apple Sign-in");
                return;
            }
            let email = user?.email;
            console.warn(email);
            let firstName = user?.fullName?.givenName;
            let lastName = user?.fullName?.familyName;

            // const {firstName, fullName, email} = user;

            const response = await fetch("http://127.0.0.1:8000/auth/apple", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    token: token,
                    email,
                    firstName,
                    lastName
                })
            });

            const data = await response.json();

            if (data.token) {
                await SecureStore.setItemAsync("session_id", data.token);

                console.log("Session ID and user info stored from Apple Sign-in");

                router.push("/Chat");
            }

        } catch (error) {
            console.log("Apple Sign-In failed: ", error);
        }
    }


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
                                {Platform.OS === 'ios' && (
                                    <MenuItem
                                        iconName="logo-apple"
                                        onPress={handleAppleSignin}
                                        btnSize={28}
                                        btnColor="white"
                                        text="Continue with Apple"
                                        textStyle={styles.login_label}
                                        menuItemStyle={styles.login_button}
                                    />)}
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
                    {resetStep === "email" ? (
                        <>
                            {/* ----- FORGOT PASSWORD EMAIL UI ----- */}
                            <Text style={styles.header}>Reset your password</Text>
                            <Text style={styles.description}>
                                Enter your Email address and we will send you instructions on how to reset your password.
                            </Text>

                            <View style={styles.inputContainer}>
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
                    ) : (
                        <>
                            {/* ----- SECURITY CODE INPUT UI ----- */}
                            <Text style={styles.header}>Enter Your Security Code</Text>
                            <Text style={styles.description}>
                                Please enter the security code sent to your email.
                            </Text>

                            <View style={styles.inputContainer}>
                                {errorMessage ? (
                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                ) : null}

                                <InputField
                                    label="Security Code"
                                    value={securityCode}
                                    onChangeText={setSecurityCode}
                                    placeholder="Enter the code"
                                    keyboardType="numeric"
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.login_button}
                                onPress={handleVerifyCode}
                            >
                                <Text style={styles.login_label}>Verify Code</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setResetStep("email");
                                    setErrorMessage("");
                                }}
                                style={styles.backToLoginButton}
                            >
                                <Text style={styles.importantText}>Back</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            )}
        </View >
    );

};
export default SignIn;