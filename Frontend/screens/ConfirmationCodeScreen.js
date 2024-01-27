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
import React, { useEffect, useState } from "react";
import { companyAuth } from "../context/AuthCompany";

import { useNavigation, useRoute } from "@react-navigation/native";

const ConfirmationCodeScreen = () => {
  const routes = useRoute();
  const { email, role } = routes.params;
  // context api
  const navigation = useNavigation();
  const { confirmCode } = companyAuth();

  const [confirmationCode, setConfirmationCode] = useState("");

  const handleChangePress = async () => {
    const result = await confirmCode(email, confirmationCode, role);
    if (result && result.error) {
      alert(result.message);
    } else {
      navigation.navigate("ResetPasswordScreen", { email: email, role: role });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text>Check you email the conformation code sent.</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Confirmation"
              onChangeText={(text) => setConfirmationCode(text)}
              value={confirmationCode}
            />
            <Pressable style={styles.editButton} onPress={handleChangePress}>
              <Text
                style={{ color: "#fff", fontSize: 18, alignSelf: "center" }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ConfirmationCodeScreen;
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
