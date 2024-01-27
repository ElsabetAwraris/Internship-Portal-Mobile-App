import React, { useContext, useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import ChatContext from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { companyAuth } from "../context/AuthCompany";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const ChatScreen = () => {
  const routes = useRoute();
  const { id: recepientId } = routes.params;
  const { id, role } = companyAuth();
  const { userRole } = useAuth();
  const {
    chats,
    sendChat,
    fetchChats,
    fetchMyIntern,
    fetchMyCompany,
    myIntern,
    myCompany,
  } = useContext(ChatContext);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchChats(recepientId);
    };
    recepientId && fetchData();
    const intervalId = setInterval(() => {
      recepientId && fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [recepientId]);
  const myrole =
    userRole === "intern" ? userRole : role === "company" ? role : "undifined";
  useEffect(() => {
    myrole === "intern" && fetchMyCompany();
    myrole === "company" && fetchMyIntern();
  }, []);

  const handleSendPress = async () => {
    const myrole =
      userRole === "intern"
        ? userRole
        : role === "company"
        ? role
        : "undifined";
    const messageType = "text";
    const result = await sendChat(recepientId, messageType, message, myrole);
    if (result && result.error) {
      alert(result.message);
    } else {
      setMessage("");
    }
  };

  // time formater
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const period = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  let filteredFriendById;

  if (role === "company") {
    filteredFriendById = myIntern.interns.filter((internId) => {
      return internId === recepientId;
    });
  } else if (role === "intern") {
    filteredFriendById = myCompany.companies.filter((companyId) => {
      return companyId === recepientId;
    });
  }

  const renderItem = ({ item }) => {
    return (
      <KeyboardAvoidingView>
        <Pressable
          style={
            item.sender._id !== recepientId
              ? {
                  alignSelf: "flex-end",
                  backgroundColor: "#C8FAD6",
                  padding: 8,
                  maxWidth: "80%",
                  minWidth: "25%",
                  borderRadius: 7,
                  margin: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 1,
                }
              : {
                  alignSelf: "flex-start",
                  backgroundColor: "#bbb",
                  padding: 8,
                  maxWidth: "80%",
                  minWidth: "25%",
                  borderRadius: 7,
                  margin: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 1,
                }
          }
        >
          <Text style={{ fontSize: 20 }}>{item.chat}</Text>
          <Text style={{ alignSelf: "flex-end", marginTop: -2, fontSize: 9 }}>
            {formatTimestamp(item.timeStamp)}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    );
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ref={(ref) => {
          this.flastList = ref;
        }}
        onContentSizeChange={() => this.flastList.scrollToEnd()}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.myInputCard}>
        <TextInput
          placeholder="Type your message..."
          style={styles.myInput}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Entypo name="camera" size={24} color="#000" />
        <Ionicons name="mic" size={24} color="#000" />
        <Pressable onPress={handleSendPress}>
          <FontAwesome name="send" size={24} color="#000" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  myInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  mypp: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  myHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  myInputCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    gap: 5,
  },
  emojiSelector: {
    height: 250,
  },
});
