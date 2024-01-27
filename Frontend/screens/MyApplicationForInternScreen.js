import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";

import InternshipContext from "../context/InternshipContext";

import * as OpenAnything from "react-native-openanything";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const MyApplicationForInternScreen = () => {
  const { myApplications, fetchMyApplication } = useContext(InternshipContext);

  const { userId } = useAuth();

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchMyApplication();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: "https://c8.alamy.com/comp/K1T6F7/internship-isolated-on-elegant-purple-diamond-button-abstract-illustration-K1T6F7.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{item.internshipTitle}</Text>
      <Text style={styles.description}>{item.applierName}</Text>
      <Text style={styles.salary}>{item.essay}</Text>
      <TouchableOpacity
        onPress={async () => {
          setIsDownloading(true);
          OpenAnything.Pdf(item.resume.url);
        }}
        disabled={isDownloading}
      >
        <Text>{isDownloading ? "Downloading..." : "Download the resume"}</Text>
        <FontAwesome name="download" size={38} color="black" />
      </TouchableOpacity>
    </View>
  );
  const filteredAppplication = myApplications?.filter((applic) => {
    return applic.applier._id === userId;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredAppplication}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={{ width: "90%" }}
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
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
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

export default MyApplicationForInternScreen;
