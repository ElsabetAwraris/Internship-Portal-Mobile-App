// screens/InternshipListingsScreen.js

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import MyApplicationForCompany from "./MyApplicationForCompany";
import ChatScreen from "./ChatScreen";
import ProfileForCompany from "./ProfileForCompany";
import { useAuth } from "../context/AuthContext";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AddInternshipScreen from "./AddInternshipScreen";
import NotificationForCompany from "./NotificationForCompany";
import { companyAuth } from "../context/AuthCompany";
import ChatRoomScreen from "./ChatRoomScreen";
import { NotifierWrapper } from "react-native-notifier";
import InternshipContext from "../context/InternshipContext";

const Tab = createBottomTabNavigator();

const CompanyDashboardScreen = () => {
  const { logout, id } = companyAuth();

  const { myApplications, fetchMyApplication } = useContext(InternshipContext);

  useEffect(() => {
    fetchMyApplication();
  }, [id]);

  const filteredAppplication = myApplications?.filter((applic) => {
    return applic.company === id && applic.status === "submitted";
  });

  return (
    <Tab.Navigator
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
          color: "#200E3A",
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
            <Pressable onPress={logout} style={{ margin: 10 }}>
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
        name="Application"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="upload"
              size={20}
              color={focused ? "#6D63FF" : "gray"}
            />
          ),
        }}
      >
        {() => (
          <NotifierWrapper>
            <MyApplicationForCompany />
          </NotifierWrapper>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Add Internship"
        component={AddInternshipScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="plus"
              size={20}
              color={focused ? "#6D63FF" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationForCompany}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ position: "relative" }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? "#6D63FF" : "gray"}
              />
              {filteredAppplication.length > 0 && (
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
              )}
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
              color={focused ? "#6D63FF" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profiles"
        component={ProfileForCompany}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={20}
              color={focused ? "#6D63FF" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CompanyDashboardScreen;
