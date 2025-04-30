//User page
import { View, Text, StatusBar, TouchableOpacity, Pressable, StyleSheet, Platform, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '@/assets/styles/RegisterStyle';
import InputField from '@/components/InputField';
import ButtonIcon from '@/components/ButtonIcon';
import { useAuth } from '@/context/authContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getAuthInfo, checkPassword, updateUserInfo } from '@/services/UserProfile';
// import { parseArgs } from 'util';

export default function UserScreen() {
  const [editing, setEditing] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [wantToEditPwd, setWantToEditPwd] = useState(false);
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
    if (fName === "" || lName === "" || email === "") {
      alert("Please fill all the fields");
      console.log("Please fill all the fields");
      return;
    }
    if (wantToEditPwd) {
      if (password === "" || rePassword === "") {
        alert("Please fill all the fields");
        console.log("Please fill all the fields");
        return;
      }
      if (password !== rePassword) {
        alert("Passwords do not match");
        console.log("Passwords do not match");
        return;
      }
      if (!checkSecurePwd(password)) {
        alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
        console.log("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
        return;
      }

    }
    const payload = {
      user_id: user.user_id,
      session_id: user.session_id,
      first_name: fName,
      last_name: lName,
      email: email,
      password: password
    };
    const update = async () => {
      let updatedUser = await updateUserInfo(payload);
      if (updatedUser) {
        updatedUser = {...updatedUser, session_id: user.session_id};
        setUser(updatedUser);
        alert("User info updated successfully");
        console.log("User info updated successfully");
        console.log(updatedUser);
      } else {
        alert("Failed to update user info");
        console.log("Failed to update user info");
      }
    }

    update();
    resetState();
  }

  const verifyPassword = async () => {
    console.log(`user email: ${email}, user password: ${password}`);
    const isCorrect = await checkPassword(email, currentPassword);
    if (isCorrect) {
      setWantToEditPwd(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password");
    }
  }

  const resetState = () => {
    setCurrentPassword("");
    setEditing(false);
    setWantToEditPwd(false);
  }

  useEffect(() => {
    //Everytime the user comes back to this page, we need to reset the state
    resetState();
  }, [])

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
        <View style={localStyles.container}>
          <StatusBar style="dark" />
          <ButtonIcon
            iconName="arrow-back"
            btnColor="black"
            btnSize={28}
            onPress={resetState}
          />
          <Text style={localStyles.header}>
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
            {wantToEditPwd ? (
              <>
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
              </>
            ) : (
              <View>
                <View style={localStyles.infoRow}>
                  <ButtonIcon
                    iconName="information-circle-outline"
                    btnColor="#3b82f6"
                    btnSize={20}
                    disabled
                  />
                  <Text style={localStyles.infoText}>
                    If you want to change your password, please enter your current password
                  </Text>
                </View>

                <View style={localStyles.passwordRow}>
                  <View style={{ flex: 1 }}>
                    <InputField
                      label="Current password"
                      value={currentPassword}
                      onChangeText={setCurrentPassword}
                      placeholder="Enter your password"
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={localStyles.sendIconWrapper}>
                    <ButtonIcon 
                      onPress={verifyPassword}
                      iconName="paper-plane-outline"
                      btnSize={24}
                      btnColor="black"
                    />
                  </View>
                </View>
                <Text>
                  If you forgot your password, please click here
                  {/* we will make this to go to the forgot password page */}
                </Text>
                
             </View>
            ) }
           
          </View>

          {/* update user info */}
          <TouchableOpacity
            onPress={handleUpdate}
            style={styles.login_button}
          >
            <Text style={localStyles.buttonText}>
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
          <View style={localStyles.avatarContainer}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/17/17004.png" }}
              style={localStyles.avatar}
            />
              
          </View>

          {/* user name container */}
          <View>
            <Text
              style={localStyles.userName}
            >
              {user.first_name} {user.last_name}</Text>
            <Text style={localStyles.userInfoText}>
              {email}  
            </Text>

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

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  header: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(2),
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: hp(2),
  },
  sectionText: {
    fontSize: hp(2),
    color: '#555',
    marginVertical: hp(1),
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: hp(5),
    marginBottom: hp(3),
  },
  avatar: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(5),
  },
  userName: {
    fontSize: hp(2.5),
    fontWeight: '600',
    marginTop: hp(1),
    textAlign: 'center',
  },
  userInfoText: {
    fontSize: hp(2),
    color: '#666',
    marginTop: hp(0.5),
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: 8,
    marginTop: hp(3),
  },
  buttonText: {
    color: '#fff',
    fontSize: hp(2),
    fontWeight: 'bold',
    marginRight: wp(2),
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.8),
    marginTop: hp(1),
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  sendIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: wp(2),
  },  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    padding: wp(3),
    borderRadius: 8,
    marginTop: hp(2),
    marginBottom: hp(1),
  },
  infoText: {
    fontSize: hp(1.8),
    color: '#0369a1',
    marginLeft: wp(2),
    flexShrink: 1,
  },
  
  
});

