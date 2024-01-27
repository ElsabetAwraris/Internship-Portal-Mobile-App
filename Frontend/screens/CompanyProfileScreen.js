import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { companyAuth } from "../context/AuthCompany";
import { useRoute } from "@react-navigation/native";
import ChatContext from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const CompanyProfileScreen = () => {
  const { company, fetchCompany } = companyAuth();
  const { userRole } = useAuth();

  const { sendChat } = useContext(ChatContext);

  const route = useRoute();
  const { companyId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      await fetchCompany();
    };

    fetchData();
  }, [fetchCompany]);

  if (!company) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleContactPress = async (id) => {
    const result = await sendChat(id, "text", "Contact Me", userRole);
    if (result && result.error) {
      alert("Send Falied");
    } else {
      alert("Chat Send");
    }
  };

  const filteredCompany = company.filter((comp) => {
    return comp._id === companyId;
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.text}>Industry: {item.industry}</Text>
      <Text style={styles.text}>Address: {item.address}</Text>
      <Text style={styles.text}>Phone Number: {item.phoneNumber}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Email: {item.email}</Text>
      <TouchableOpacity onPress={() => handleContactPress(item._id)}>
        <Text>Contact</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCompany}
        keyExtractor={(item) => item.email}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 100,
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 2,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CompanyProfileScreen;
