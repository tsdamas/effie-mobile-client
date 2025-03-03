import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MenuItem from '@/components/MenuItem';
import { Colors } from '@/assets/styles/colors';

export default function SignIn() {
  return (
    <View style={styles.sign_in_container}>
        <StatusBar style="dark" />
        {/* Log in text */}
        <View style={styles.sign_in_container}>
            <Text style={styles.header}>Login to your account</Text>
        </View>
        <View style={styles.sign_in_container}>
           
                <MenuItem
                    iconName="logo-apple"
                    onPress={()=>{}}
                    btnSize={28}
                    btnColor='white'
                    text="Continue with Apple"
                    textStyle={styles.login_label}
                    menuItemStyle={styles.login_button}
                />
            
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    sign_in_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 'large'
    },
    login_label: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 'large',
        marginLeft: wp(1),
        color: 'white',
    },
    login_button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: 'center',
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
        borderRadius: 50,
        backgroundColor: Colors.effie_green
    }
});