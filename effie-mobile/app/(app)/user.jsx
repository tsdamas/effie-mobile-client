//User page
import { View, Text, StatusBar, TouchableOpacity, Pressable, StyleSheet, Platform, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/assets/styles/RegisterStyle';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { useAuth } from '@/context/authContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getAuthInfo } from '@/services/UserProfile';

export default function UserScreen() {
  const [editing, setEditing] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const {user, setUser} = useAuth();

  const goToEditMode = () => {
    setEditing(true);
  }

  const checkSecurePwd = (pwd) => {
    const securePwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return securePwdRegex.test(pwd);
  }

  const handleUpdate = () => {
    setEditing(false);
  }

  useEffect(() => {
    console.log(JSON.stringify(user));
    const fetchUserData = async () => {
      const authInfo = await getAuthInfo(user.user_id);
      if (authInfo) {
        setEmail(authInfo.email);
        // Don't set password directly if you're not returning it
        if (user) {
          setFName(user.first_name);
          setLName(user.last_name);
        }
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <>
      { editing ? (
        <View style={styles.container}>
          <StatusBar style="dark" />
          <Text style={styles.header}>
            Update your account
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

          {/* update user info */}
          <TouchableOpacity
            onPress={handleUpdate}
            style={styles.login_button}
          >
            <Text style={styles.login_label}>
              Save changes
            </Text>
            <ButtonIcon
              iconName="save"
              btnColor="white"
              btnSize={28}
              onPress={handleUpdate}
            />
          </TouchableOpacity>             
        </View >
      ) : (
        <View>

          {/* user image container */}
          <View>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }}
              style={{ width: hp(5),
                height: hp(5),
                borderRadius: hp(2.5),
                marginRight: wp(2),}}
            />
              
          </View>

          {/* user name container */}
          <View>
            <Text>{user.first_name} {user.last_name}</Text>
          
          </View>

          {/* user email and password container */}
          <View>

          </View>

          {/* Edit info btn */}
          <TouchableOpacity
            onPress={goToEditMode}
            style={styles.login_button}
          >
            <Text style={styles.login_label}>
              Edit your profile
            </Text>
            <ButtonIcon
              iconName="build"
              btnColor="white"
              btnSize={28}
              onPress={goToEditMode}
            />
          </TouchableOpacity>     
        
        </View>
      )
        
      }
    </>
        
  );
}
