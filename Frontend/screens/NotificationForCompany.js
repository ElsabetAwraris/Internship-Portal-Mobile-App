import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import InternshipContext from "../context/InternshipContext";

import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { companyAuth } from "../context/AuthCompany";

const NotificationForCompany = () => {
  const { myApplications, fetchMyApplication } = useContext(InternshipContext);

  const { id } = companyAuth();

  useEffect(() => {
    fetchMyApplication();
  }, [id]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: "https://media.istockphoto.com/id/1218970736/photo/male-and-female-students-looking-at-car-engine-on-auto-mechanic-apprenticeship-course-at.jpg?s=612x612&w=0&k=20&c=kuofsjqvmyL9_w11-VBXRpf_G7dMogVR-k2Hpu-wNqE=",
        }}
        style={styles.image}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          padding: 4,
        }}
      >
        <Text style={styles.title}>{item.internshipTitle}</Text>
        <Text style={styles.salary}>
          Congratulations! You've been selected for the internship at My
          Company. We look forward to welcoming you on [Start Date]. Please
          confirm your acceptance by [Date].
        </Text>
      </View>
    </View>
  );
  const filteredAppplication = myApplications?.filter((applic) => {
    return applic.company === id && applic.status === "submitted";
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredAppplication}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    gap: 3,
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userDescription: {
    fontSize: 16,
    marginBottom: 4,
  },
  salary: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#6F81FF",
    borderRadius: 5,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  myInput: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 30,
    width: "95%",
    paddingHorizontal: 10,
    margin: 5,
  },
});

export default NotificationForCompany;
