import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { companyAuth } from "../context/AuthCompany";

import { useNavigation, useRoute } from "@react-navigation/native";

const ResetPasswordScreen = () => {
  const routes = useRoute();
  const { email, role } = routes.params;
  // user Information edition
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // context api
  const { resetPassword } = companyAuth();
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    // if on Password change page
    if (newPassword === confirmPassword) {
      const result = await resetPassword(email, newPassword, role);
      if (result && result.error) {
        alert(result.msg);
      } else {
        if (role === "company") {
          navigation.navigate("LoginForCompany");
        } else {
          navigation.navigate("LoginScreen");
        }
        showToast("Password reseted Successfully");
      }
    } else {
      showToast("Password don't match");
    }
  };

  // toast Funtion
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="New Password"
              secureTextEntry
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />

            <Pressable
              style={styles.editButton}
              onPress={() => handleChangePassword()}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, alignSelf: "center" }}
              >
                Change Password
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },

  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 210,
  },

  editButton: {
    width: "70%",
    backgroundColor: "#6D63FF",
    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
  },
  password: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    width: "70%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#6D63FF",
    fontSize: 18,
    marginTop: 19,
  },
});
