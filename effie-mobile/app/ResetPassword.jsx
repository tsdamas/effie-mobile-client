import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import InputField from '@/components/InputField'; 
import styles from '@/assets/styles/SignInStyles'; // Reuse existing styles

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const { email } = useLocalSearchParams(); // Receive email from params

    const handleResetPassword = async (email) => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://10.0.2.2:8000/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, new_password: newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Password reset successfully.", "", [
                    { text: "OK", onPress: () => router.replace("/SignIn") },
                ]);
            } else {
                Alert.alert(data.message || "Failed to reset password.");
            }
        } catch (error) {
            Alert.alert("Something went wrong.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Enter your new password</Text>

            <View style={styles.inputContainer}>
                <InputField
                    label="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    secureTextEntry={true}
                />
                <InputField
                    label="Retype New Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Retype new password"
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity style={styles.login_button} onPress={handleResetPassword}>
                <Text style={styles.login_label}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
}
