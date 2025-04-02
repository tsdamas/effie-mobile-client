import { View, Text, StatusBar, TouchableOpacity, Pressable, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '@/assets/styles/colors';
import { useAuth } from '@/context/authContext';
export default function Register() {

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
      
      register(fName, lName, email, password)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.header}>
        Create your account
      </Text>
      <View style={styles.inputContainer}>
      <InputField
          label="First Name"
          value={fName}
          onChangeText={setFName}
          placeholder="Enter your name"
          keyboardType="default"
        />
        <InputField
          label="Last Name"
          value={lName}
          onChangeText={setLName}
          placeholder="Enter your last name"
          keyboardType="default"
        />
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
        onPress={handleRegister}
        style={styles.login_button}
      >
        <Text style={styles.login_label}>
          Register
        </Text>
        <ButtonIcon
          iconName="arrow-forward"
          btnColor="white"
          btnSize={28}
          onPress={handleRegister}
        />
      </TouchableOpacity>

      {/* Go to signIn */}
      <View style={styles.signin_upContainer}>
        <Text style={styles.already_label}>
          Already have an account?
        </Text>
        <Pressable
          onPress={() => router.push('/SignIn')}
        >
          <Text style={styles.importantText}>
            Sign In
          </Text>
        </Pressable>
      </View>                
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
