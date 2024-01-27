// screens/InternshipListingsScreen.js

import { Text, Pressable, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./ChatScreen";
import { useAuth } from "../context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import MyApplicationForInternScreen from "./MyApplicationForInternScreen";
import NotificationForInternScreen from "./NotificationForInternScreen";
import ChatScreen from "./ChatScreen";
import ProfileForInternScreen from "./ProfileForInternScreen";
import ChatRoomScreen from "./ChatRoomScreen";
import { useContext, useEffect } from "react";
import InternshipContext from "../context/InternshipContext";

const Tab = createBottomTabNavigator();

const InternshipListScreen = () => {
  const { userId, onLogout } = useAuth();
  const { myApplications, fetchMyApplication } = useContext(InternshipContext);

  useEffect(() => {
    fetchMyApplication();
  }, [userId]);

  const filteredAppplication = myApplications?.filter((applic) => {
    return applic.applier._id === userId && applic.status === "Accepted";
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 40,
          marginHorizontal: 20,
          height: 60,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Pressable onPress={onLogout} style={{ margin: 10 }}>
              <Text>Signout</Text>
            </Pressable>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={20}
              color={focused ? "#6D63FF" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Application"
        component={MyApplicationForInternScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="upload"
              size={20}
              color={focused ? "#6D63FF" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationForInternScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "relative" }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? "#6D63FF" : "gray"}
              />
              <Text
                style={{
                  position: "absolute",
                  right: -10,
                  top: -10,
                  backgroundColor: "red",
                  borderRadius: 50,
                  width: 20,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {filteredAppplication && filteredAppplication.length}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatRoomScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="wechat"
              size={20}
              color={focused ? "#6D63FF" : "gray"} // Change 'or' to ':'
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={ProfileForInternScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={20}
              color={focused ? "#6D63FF" : "gray"} // Change 'or' to ':'
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default InternshipListScreen;
