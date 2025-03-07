import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import MenuItem from '@/components/MenuItem';
import { Colors } from '@/assets/styles/colors';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { useAuth } from '@/context/authContext';

export default function SignIn() {
    const [loginOption, setLoginOption] = useState("none");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const [showForgotPassword, setShowForgotPassword] = useState(false);


    const switchLoginOption = (opt) => {
        setLoginOption(opt);
        console.log(opt);
    };

    const handleLogin = async () => {
        login(email, password);
    };

    //revise regex later (use regex library?)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSendInstructions = () => {
        //Check if email matches the regex
        if (!emailRegex.test(email)) {
            setErrorMessage("Incorrect email");
            return;
        }
        //add another check to search database for email
        //
        //
        //
        //
        //

        //If prior two checks pass; clear error -> show popup
        setErrorMessage("");
        Alert.alert(
            "Please check your Email for instructions on how to reset your password, it may take a few minutes to arrive.",
            [{ text: "OK" }]
        );
        //Insert actual PW reset logic here
        //
        //
        //
        //
        
    };

    console.log("Current OS:", Platform.OS);
    return (
        <View style={styles.sign_in_container}>
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
                                    onPress={() => switchLoginOption("google")}
                                    btnSize={28}
                                    btnColor="white"
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
                                <Text style={styles.already_label}>
                                    Don't have an account? Sign Up
                                </Text>
                            </>
                        ) : (
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

                                {/* Forgot password button */}
                                <TouchableOpacity
                                    onPress={() => setShowForgotPassword(true)}
                                    style={styles.forgotButton}
                                >
                                    <Text style={styles.forgotText}>Forgot Password?</Text>
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
                        <Text style={styles.backText}>Back to Login</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  sign_in_container: {
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
    fontSize: 16,
    marginTop: hp(3),
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginTop: hp(2),
  },
  forgotButton: {
    marginTop: hp(2),
  },
  forgotText: {
    fontSize: 16,
    color: Colors.effie_green,
    textDecorationLine: 'underline',
    textAlign: 'center',
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
  backText: {
    color: Colors.effie_green,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: hp(1),
    textAlign: 'center',
  },
});
