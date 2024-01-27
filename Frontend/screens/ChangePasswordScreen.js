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
import { useAuth } from "../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const route = useRoute();
  const { role } = route.params;
  // user Information edition
  // Password Infromation
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // context api
  const { changePassword } = useAuth();
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    // if on Password change page
    if (newPassword === confirmPassword) {
      const result = await changePassword(currentPassword, newPassword, role);
      if (result && result.error) {
        alert(result.msg);
      } else {
        if (role === "intern") {
          navigation.navigate("ProfileForInternScreen");
        } else {
          navigation.navigate("ProfileForCompany");
        }
        showToast("Password Changed Successfully");
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
              placeholder="Current Password"
              secureTextEntry
              onChangeText={(text) => setCurrentPassword(text)}
              value={currentPassword}
            />
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

export default ChangePasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  topContainer: {
    position: "relative",
    alignItems: "center",
  },
  halfCircle: {
    backgroundColor: "#c7e2d9",
    width: 460,
    height: 230,
    borderBottomLeftRadius: 230,
    borderBottomRightRadius: 230,
    position: "absolute",
    top: -50,
  },

  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 210,
  },
  myname: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#6D63FF",
    position: "absolute",
    top: 110,
  },
  mypp: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: "absolute",
    top: 140,
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
