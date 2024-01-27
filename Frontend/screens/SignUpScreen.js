// ... (imports)User
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { companyAuth } from "../context/AuthCompany";

function SignUpScreen() {
  const [userType, setUserType] = useState("intern");
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    university: "",
    major: "",
    company: "",
    industry: "",
    companyAddress: "",
  });

  // context api
  const { register } = useAuth();
  const { registerCompany } = companyAuth();

  const toggleUserType = (type) => {
    setUserType(type);
    // Clear form fields when toggling user type
    setForm({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      university: "",
      major: "",
      company: "",
      industry: "",
      companyAddress: "",
    });
  };

  const handleSignup = async () => {
    // Basic form validation
    if (!form.email || !form.password || !form.confirmPassword) {
      Alert.alert(
        "Error",
        "Email, password, and confirm password are required"
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      if (userType === "intern") {
        const result = await register(
          form.name,
          form.phoneNumber,
          form.university,
          form.major,
          form.email,
          form.password
        );

        if (result && result.error) {
          alert(result.message);
        } else {
          navigation.navigate("LoginScreen");
        }
      } else {
        const result = await registerCompany(
          form.company,
          form.industry,
          form.companyAddress,
          form.phoneNumber,
          form.password,
          form.email
        );

        if (result && result.error) {
          alert(result.message);
        } else {
          navigation.navigate("LoginForCompany");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Sign up failed. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { marginTop: 20 }]}>
          Create an account on <Text style={{ color: "#6D63FF" }}>MyApp</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => toggleUserType("intern")}>
            <View
              style={[styles.btn, userType === "intern" && styles.activeButton]}
            >
              <Text style={styles.btnText}>Intern</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleUserType("company")}>
            <View
              style={[
                styles.btn,
                userType === "company" && styles.activeButton,
              ]}
            >
              <Text style={styles.btnText}>Company</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Full Name field only for interns */}
        {userType === "intern" && (
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              autoCapitalize="words"
              onChangeText={(name) => setForm({ ...form, name })}
              placeholder="Elthabet Awraris"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.name}
            />
          </View>
        )}

        {/* University and Major fields only for interns */}
        {userType === "intern" && (
          <>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>University</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={(university) => setForm({ ...form, university })}
                placeholder="Your University"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.university}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Major</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={(major) => setForm({ ...form, major })}
                placeholder="Your Major"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.major}
              />
            </View>
          </>
        )}

        {/* Company, Industry, and Company Address fields only for companies */}
        {userType === "company" && (
          <>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Company Name</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={(company) => setForm({ ...form, company })}
                placeholder="Company Name"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.company}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Industry</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={(industry) => setForm({ ...form, industry })}
                placeholder="Company Industry"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.industry}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Company Address</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={(companyAddress) =>
                  setForm({ ...form, companyAddress })
                }
                placeholder="Company Address"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.companyAddress}
              />
            </View>
          </>
        )}

        {/* Common form fields */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email address</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setForm({ ...form, email })}
            placeholder="elthi@example.com"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.email}
          />
        </View>

        {/* Phone Number field only for companies */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            keyboardType="phone-pad"
            onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
            placeholder="Enter your phone number"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.phoneNumber}
          />
        </View>

        {/* Password and Confirm Password fields */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            autoCorrect={false}
            onChangeText={(password) => setForm({ ...form, password })}
            placeholder="********"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            secureTextEntry={true}
            value={form.password}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            autoCorrect={false}
            onChangeText={(confirmPassword) =>
              setForm({ ...form, confirmPassword })
            }
            placeholder="********"
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            secureTextEntry={true}
            value={form.confirmPassword}
          />
        </View>

        {/* ... Additional form fields ... */}

        <TouchableOpacity style={styles.btn} onPress={handleSignup}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: "#fff",
  },
  header: {
    marginVertical: 36,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 1, // Adjusted to fine-tune the positioning
    textAlign: "center",
  },

  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8, // Reduced padding for a smaller button
    paddingHorizontal: 8, // Reduced padding for a smaller button
    borderWidth: 1,
    backgroundColor: "#6D63FF",
    borderColor: "#6D63FF",
    width: "88%", // Adjusted width to fit two buttons on the same row
    marginBottom: 20,
    color: "#6D63FF",
    alignSelf: "center",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#6D63FF",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // Reduced margin for a smaller button
  },
  activeButton: {
    backgroundColor: "#6D63FF",
  },
});
