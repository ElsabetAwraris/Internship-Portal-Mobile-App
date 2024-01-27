import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./navigation/AppNavigator";
import { InternshipProvider } from "./context/InternshipContext";
import { AuthProvider } from "./context/AuthContext";
import { AuthCompanyProvider } from "./context/AuthCompany";
import { ChatProvider } from "./context/ChatContext";
import * as Notifications from "expo-notifications";
import CompanyDashboardScreen from "./screens/CompanyDashboardScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthCompanyProvider>
          <InternshipProvider>
            <ChatProvider>
              <AppNavigator />
            </ChatProvider>
          </InternshipProvider>
        </AuthCompanyProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
