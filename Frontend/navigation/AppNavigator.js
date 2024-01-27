// AppNavigator.js

import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import LoginForCompany from "../screens/LoginForCompany";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import InternshipListScreen from "../screens/InternshipListScreen";
import InternshipDetail from "../screens/InternshipDetail";
import CompanyDashboardScreen from "../screens/CompanyDashboardScreen";
import ChatScreen from "../screens/ChatScreen";
import ApplyScreen from "../screens/ApplyScreen";
import CompanyProfileScreen from "../screens/CompanyProfileScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import EmailConfirmScreen from "../screens/EmailConfirmScreen";
import ConfirmationCodeScreen from "../screens/ConfirmationCodeScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import ProfileForInternScreen from "../screens/ProfileForInternScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";
import ProfileForCompany from "../screens/ProfileForCompany";

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginForCompany"
        component={LoginForCompany}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InternshipListScreen"
        component={InternshipListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InternshipDetail"
        component={InternshipDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompanyDashboardScreen"
        component={CompanyDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="ApplyScreen"
        component={ApplyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompanyProfileScreen"
        component={CompanyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailConfirmScreen"
        component={EmailConfirmScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmationCodeScreen"
        component={ConfirmationCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileForInternScreen"
        component={ProfileForInternScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInformationScreen"
        component={PersonalInformationScreen}
        options={{ headerTitle: "Personal Information " }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerTitle: "Change Password" }}
      />
      <Stack.Screen
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{ headerTitle: "Change Email" }}
      />
      <Stack.Screen
        name="ProfileForCompany"
        component={ProfileForCompany}
        options={{ headerTitle: "Change Email" }}
      />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
