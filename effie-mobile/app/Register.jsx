import { View, Text, StatusBar, TouchableOpacity, Pressable, StyleSheet, Platform, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors } from '@/assets/styles/colors';
import { useAuth } from '@/context/authContext';
import styles from '@/assets/styles/RegisterStyle';

export default function Register() {

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const checkSecurePwd = (pwd) => {
    const securePwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return securePwdRegex.test(pwd);
  }

  const handleRegister = () => {
    const isPwdSecure = checkSecurePwd(password);
    console.log(`Password is secure? ${isPwdSecure}`);
    const matches = (rePassword == password);
    if(isPwdSecure && matches){
      register(fName, lName, email, password);
    } else if (!matches){
      Alert.alert("Passwords don't match")
    } else {
      Alert.alert("Please use a secure password with: Minimum 8 characters, 1 uppercase letter, 1 digit and one special character!")
    }
      
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* <Image
        source={require('../assets/images/effieLogo.png')}
        style={{
            width: wp(40),
            height: hp(10),
            marginBottom: hp(2),
            alignSelf: 'center',  }}
        resizeMode="contain"
      /> */}
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
        <InputField
          label="Re-enter password"
          value={rePassword}
          onChangeText={setRePassword}
          placeholder="Enter your password again"
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
  
};
