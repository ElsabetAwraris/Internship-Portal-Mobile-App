import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import InternshipContext from "../context/InternshipContext";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { companyAuth } from "../context/AuthCompany";

const HomeScreen = () => {
  const {
    internships,
    popularInternships,
    nearestInternships,
    fetchInternships,
    fetchPopularInternships,
    fetchNearestInternships,
  } = useContext(InternshipContext);
  const { authState, userRole } = useAuth();
  const { companyState, role } = companyAuth();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [nearest, setNearest] = useState(nearestInternships.nearestInternships);

  useEffect(() => {
    fetchInternships();
    fetchPopularInternships();
    fetchNearestInternships();
  }, []);

  useEffect(() => {
    setNearest(nearestInternships.nearestInternships);
  }, [nearestInternships]);

  // authState.authenticated effect
  useEffect(() => {
    const fetchData = async () => {
      if (role === "company") {
        navigation.navigate("CompanyDashboardScreen");
      } else if (userRole === "intern") {
        navigation.navigate("InternshipListScreen");
      }
    };

    fetchData();
  }, [role, userRole]);

  const renderHorizontalItem = ({ item }) => (
    <View style={styles.horizontalItemContainer}>
      {/* Your existing item layout */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          source={{
            uri: "https://c8.alamy.com/comp/K1T6F7/internship-isolated-on-elegant-purple-diamond-button-abstract-illustration-K1T6F7.jpg",
          }}
          style={styles.imageh}
        />
        <Text style={styles.titleh}>{item.title}</Text>
      </View>
      <Text style={styles.description1} numberOfLines={1}>
        {item.description}
      </Text>
      <Text style={styles.salary}>{item.season}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("InternshipDetail", { internship: item })
        }
        style={styles.detailsButton}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVerticalItem = ({ item }) => (
    <View style={styles.verticalItemContainer}>
      {/* Your existing item layout */}
      <Image
        source={{
          uri: "https://c8.alamy.com/comp/K1T6F7/internship-isolated-on-elegant-purple-diamond-button-abstract-illustration-K1T6F7.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.salary}>{item.season}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("InternshipDetail", { internship: item })
        }
        style={styles.detailsButton}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.myInput}
        placeholder="Find Your Perfect Internship"
        onChangeText={(text) => {
          const test = nearestInternships.nearestInternships?.filter((near) => {
            return near?.title.toLowerCase().includes(text.toLowerCase());
          });

          setNearest(test);
          setSearch(text);
        }}
        type="text"
        value={search}
      />
      {/* Title for Horizontal FlatList (Popular) */}
      <View style={{ display: search ? "none" : "block" }}>
        <Text style={styles.titleText}>Popular Internship</Text>
      </View>
      <FlatList
        data={popularInternships.popularInternships || []}
        renderItem={renderHorizontalItem}
        keyExtractor={(item) => item._id}
        horizontal
        style={{
          height: 230,
          marginBottom: 10,
          display: search ? "none" : "block",
        }}
        showsHorizontalScrollIndicator={false}
      />
      {/* Title for Vertical FlatList (Recent) */}
      <Text style={styles.titleText}>Recent Internship</Text>
      <FlatList
        data={nearest || []}
        renderItem={renderVerticalItem}
        keyExtractor={(item) => item._id}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFF",
  },
  horizontalItemContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#6D63FF",
    margin: 10,
    padding: 10,
    backgroundColor: "#F9F9FB",
    elevation: 2,
  },
  verticalItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    // borderBottomWidth: 1,
    // borderColor: "#6D63FF",
    elevation: 2,
    margin: 10,
    backgroundColor: "#F9F9FB",
  },
  image: {
    width: "30%",
    height: 60,
  },
  imageh: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  titleh: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  description1: {
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
  myInput: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 30,
    width: "95%",
    paddingHorizontal: 10,
    margin: 5,
    borderColor: "#6D63FF",
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#6D63FF",
    paddingLeft: 10,
  },
});

export default HomeScreen;
