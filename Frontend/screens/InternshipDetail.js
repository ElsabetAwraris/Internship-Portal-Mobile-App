import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { companyAuth } from "../context/AuthCompany";
import { useAuth } from "../context/AuthContext";
import InternshipContext from "../context/InternshipContext";

const InternshipDetail = () => {
  const { role, id } = companyAuth();
  const { userRole } = useAuth();
  const { applications, fetchApplication } = useContext(InternshipContext);

  useEffect(() => {
    role === "company" && fetchApplication();
  }, []);

  const route = useRoute();
  const { internship: item } = route.params;

  const navigation = useNavigation();

  const handleApply = () => {
    // Navigate to ApplyScreen
    navigation.navigate("ApplyScreen", { internship: item });
  };

  const handleCompanyProfile = (companyId) => {
    navigation.navigate("CompanyProfileScreen", { companyId });
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dqfbtzvsv/image/upload/v1704490910/cld-sample.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.description}>{item.applierName}</Text>
      <Text style={styles.salary}>{item.essay}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://c8.alamy.com/comp/K1T6F7/internship-isolated-on-elegant-purple-diamond-button-abstract-illustration-K1T6F7.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.season}>Season: {item.season}</Text>
      {userRole === "intern" && (
        <View>
          <TouchableOpacity onPress={handleApply} style={styles.button}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleCompanyProfile(item.company)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Company Profile</Text>
          </TouchableOpacity>
        </View>
      )}
      {role === "company" && (
        <View style={styles.applicatant}>
          <Text>My Applicant</Text>
          <FlatList
            data={applications}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={{ width: "90%" }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  salary: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#6D63FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  applicatant: {
    width: "100%",
    alignItems: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 2,
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
    backgroundColor: "#6D63FF",
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

export default InternshipDetail;
