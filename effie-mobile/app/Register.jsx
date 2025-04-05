import { View, Text, StatusBar, TouchableOpacity, Pressable, StyleSheet, Platform } from 'react-native'
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
  
};
