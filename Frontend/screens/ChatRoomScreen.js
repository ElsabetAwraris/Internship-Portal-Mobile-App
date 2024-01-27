import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ChatContext from "../context/ChatContext";
import { companyAuth } from "../context/AuthCompany";
import { useAuth } from "../context/AuthContext";

export default function ChatRoomScreen() {
  const { fetchMyIntern, fetchMyCompany, myIntern, myCompany } =
    useContext(ChatContext);
  const { id, role } = companyAuth();
  const { userId, userRole } = useAuth();
  const navigation = useNavigation();

  // authState.authenticated effect
  useEffect(() => {
    role === "company" && fetchMyIntern();
    userRole === "intern" && fetchMyCompany();
  }, [id]);

  const handleUserPress = (userId) => {
    navigation.navigate("ChatScreen", { id: userId });
  };

  const renderItem1 = ({ item }) => (
    <Pressable
      onPress={() => handleUserPress(item._id)}
      style={{ marginBottom: 10, borderBottomWidth: 1 }}
    >
      <View style={styles.userContainer}>
        <Image
          style={styles.mypp}
          source={{
            uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
          }}
        />
        <View style={styles.container}>
          <Text style={styles.name}>{item.companyName || item.name}</Text>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {item.recentMessage.chat}
          </Text>
        </View>
        <Text style={styles.time}>Today</Text>
      </View>
    </Pressable>
  );

  const data =
    userRole === "intern"
      ? myCompany.companies
      : role === "company"
      ? myIntern.interns
      : [];

  return (
    <View>
      {/* User cards */}
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem1}
          contentContainerStyle={{
            flexGrow: 1,

            padding: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        />
      </View>
    </View>
  );
}
// }

// my styles
const styles = StyleSheet.create({
  mainContainer: {
    padding: 2,
    gap: 10,
    backgroundColor: "#fff",
  },
  topCard: {
    marginVertical: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  userContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    marginLeft: 10,
    gap: 10,
  },
  mypp: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00a76f",
  },
  topname: {
    marginTop: 5,
    fontSize: 15,
    color: "#00a76f",
  },
  message: {
    color: "#637381",
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00a76f",
  },
});
