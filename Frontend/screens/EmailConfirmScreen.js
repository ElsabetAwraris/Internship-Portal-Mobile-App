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
import { useNavigation, useRoute } from "@react-navigation/native";
import { companyAuth } from "../context/AuthCompany";

const EmailConfirmScreen = () => {
  const routes = useRoute();
  const { role } = routes.params;
  // context api
  const navigation = useNavigation();
  const { confirmation } = companyAuth();
  const [email, setEmail] = useState("");

  const handleChangePress = async () => {
    const result = await confirmation(email, role);
    if (result && result.error) {
      console.log(result);
      alert(result.message);
    } else {
      navigation.navigate("ConfirmationCodeScreen", {
        email: email,
        role: role,
      });
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
            <TextInput
              keyboardType="email-address"
              style={styles.textInput}
              placeholder="Email address"
              onChangeText={(text) => setEmail(text)}
              value={email}
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

export default EmailConfirmScreen;
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
