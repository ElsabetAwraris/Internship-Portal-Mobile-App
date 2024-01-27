import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import WelcomeImage from "../assets/welcome-img.png";
import { companyAuth } from "../context/AuthCompany";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
const WelcomeScreen = () => {
  const { role, compantState } = companyAuth();
  const { userRole, auttState } = useAuth();
  const navigation = useNavigation();

  // authState.authenticated effect
  // authState.authenticated effect
  useEffect(() => {
    const fetchData = async () => {
      if (role === "company") {
        compantState.authenticated &&
          navigation.navigate("CompanyDashboardScreen");
      } else if (userRole === "intern") {
        auttState.authenticated && navigation.navigate("InternshipListScreen");
      }
    };

    fetchData();
  }, [role, userRole]);

  return (
    <View style={styles.container}>
      <Image source={WelcomeImage} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.description}>
          Welcome to Our App! Explore and Connect with Us.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Get Started as Intern</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginForCompany")}
        >
          <Text style={styles.buttonText}>Get Started as Company</Text>
        </TouchableOpacity>

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: " #FFFf",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  description: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  button: {
    width: "70%",
    backgroundColor: "#6D63FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  socialMedia: {
    flexDirection: "row",
  },
  socialIcon: {
    marginHorizontal: 10,
  },
});

export default WelcomeScreen;
