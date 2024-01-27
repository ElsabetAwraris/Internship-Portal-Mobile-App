import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, authState } = useAuth();
  const navigation = useNavigation();

  const handleSignIn = async () => {
    const mytoken = await registerForPushNotificationsAsync();
    const result = await onLogin(email, password, mytoken);
    if (result && result.error) {
      alert("Login Falied");
    } else {
      navigation.navigate("InternshipListScreen");
    }
  };

  // authState.authenticated effect
  useEffect(() => {
    const fetchData = async () => {
      if (authState.authenticated) {
        navigation.navigate("InternshipListScreen");
      }
    };

    fetchData();
  }, [authState.authenticated]);

  const handleForgot = () => {
    navigation.navigate("EmailConfirmScreen", { role: "intern" });
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "d29e0a1a-3a9c-440b-acb3-ed371c6be510",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          alt=""
          resizeMode="contain"
          style={styles.headerImg}
          source={{
            uri: "https://vinno.vn/sites/default/files/mobile-marketing-la-gi.jpg",
          }}
        />

        <Text style={styles.subtitle}>Find Dream Internship Program</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.input}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            placeholder="enter email"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={email}
          />
        </View>

        <View style={styles.input}>
          <TextInput
            autoCorrect={false}
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            secureTextEntry={true}
            value={password}
          />
        </View>
        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgot}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        {/* Social Media Connections */}
        <View style={styles.socialMedia}>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="facebook" size={30} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="twitter" size={30} color="#1da1f2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="instagram" size={30} color="#c13584" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            // Handle link to sign up
            navigation.navigate("SignUpScreen"); // Assuming you have a SignUpScreen
          }}
          style={{ marginTop: "auto" }}
        >
          <Text style={styles.formFooter}>
            Don't have an account?{" "}
            <Text style={{ textDecorationLine: "underline", color: "#6D63FF" }}>
              Sign up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#fff",
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 420,
    height: 400,
    alignSelf: "center",
    marginBottom: 0,
    marginTop: -80,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 3,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1, // Add this line to set the border width
    borderColor: "#6D63FF", // Set the border color to your desired color
    fontSize: 15,
    fontWeight: "500",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6D63FF",
    width: "100%",
    color: "#200E3A", // Add this line to make the button cover the full width
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  formAction: {
    flexDirection: "column", // Change to column
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24, // Add margin to separate from the input fields
  },

  forgotPassword: {
    fontSize: 15,
    color: "#6D63FF",
    textDecorationLine: "underline",
    marginTop: 16, // Add margin to separate from the "Sign In" button
    marginLeft: 250,
  },

  socialMedia: {
    flexDirection: "row",
    justifyContent: "center", // Center horizontally
    marginTop: 20,
  },

  socialIcon: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
});
