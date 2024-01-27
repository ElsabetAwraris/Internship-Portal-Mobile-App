import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { companyAuth } from "../context/AuthCompany";

const PersonalInformationScreen = () => {
  const route = useRoute();
  const { role } = route.params;
  // context api
  const { fetchUser, user, updateInformation } = useAuth();
  const { fetchCompany, company } = companyAuth();
  const navigation = useNavigation();

  useEffect(() => {
    role === "intern" && fetchUser();
    role === "company" && fetchCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // user Information edition
  const [name, setName] = useState(user.name);
  const [major, setMajor] = useState(user.major);
  const [address, setAddress] = useState(company[0].address);
  const [companyName, setCompanyName] = useState(company[0].companyName);
  const [phoneNumber, setPhoneNumber] = useState(
    role === "intern" ? user.phoneNumber : company[0].phoneNumber
  );

  const handleChangePress = async () => {
    result = await updateInformation(
      name,
      major,
      companyName,
      address,
      phoneNumber,
      role
    );

    if (result && result.error) {
      alert(result.message);
    } else {
      if (role === "intern") {
        navigation.navigate("ProfileForInternScreen");
      } else {
        navigation.navigate("ProfileForCompany");
      }
      showToast("Information Changed Successfully");
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
            {role === "intern" && (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Name"
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Major"
                  onChangeText={(text) => setMajor(text)}
                  value={major}
                />
              </>
            )}

            {role === "company" && (
              <>
                <TextInput
                  style={styles.textInput}
                  placeholder="Copmany Name"
                  onChangeText={(text) => setCompanyName(text)}
                  value={companyName}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Address"
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                />
              </>
            )}

            <TextInput
              style={styles.textInput}
              placeholder="Phone number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
            />

            <Pressable style={styles.editButton} onPress={handleChangePress}>
              <Text
                style={{ color: "#fff", fontSize: 18, alignSelf: "center" }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationScreen;
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
