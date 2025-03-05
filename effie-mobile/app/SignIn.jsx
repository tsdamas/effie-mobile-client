import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MenuItem from '@/components/MenuItem';
import { Colors } from '@/assets/styles/colors';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';

export default function SignIn() {

    // const [loginOption, setLoginOption] = useState("none");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginOption = (opt) => {
        // setLoginOption(opt);
        console.log(opt);
    }

    return (
        <View style={styles.sign_in_container}>
            {/* {console.log(loginOption)} */}
            <StatusBar style="dark" />
            {/* Log in text */}
            <View style={styles.sign_in_container}>
                <Text style={styles.header}>Login to your account</Text>
            </View>
            <View style={styles.login_buttons_container}>
            {
            // loginOption=="none"
            (2+2 == 5)
             ? (
               
            <>
                    <MenuItem
                        iconName="logo-apple"
                        onPress={handleLoginOption("apple")}
                        btnSize={28}
                        btnColor='white'
                        text="Continue with Apple"
                        textStyle={styles.login_label}
                        menuItemStyle={styles.login_button}
                    />

                    <MenuItem
                        iconName="logo-google"
                        onPress={handleLoginOption("google")}
                        btnSize={28}
                        btnColor='white'
                        text="Continue with Google"
                        textStyle={styles.login_label}
                        menuItemStyle={styles.login_button}
                    />

                    <MenuItem
                        iconName="mail"
                        onPress={handleLoginOption("email")}
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
                onPress={handleLoginOption("none")}
                style={styles.login_button}>
                    <Text style={styles.login_label}>
                        Login
                    </Text>
                    <ButtonIcon
                        iconName="arrow-forward"
                        btnColor="white"
                        btnSize={28}
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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
