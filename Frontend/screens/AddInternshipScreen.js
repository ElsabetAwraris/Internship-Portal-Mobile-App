import React, { useContext, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import InternshipContext from "../context/InternshipContext";
import { useNavigation } from "@react-navigation/native";

const AddInternshipScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [season, setSeason] = useState("");

  const { addInternship } = useContext(InternshipContext);
  const navigation = useNavigation();

  const handlePostInternship = async () => {
    try {
      const result = await addInternship(title, description, season);
      if (result && result.error) {
        Alert.alert("Error", "Failed to add Internship");
      } else {
        Alert.alert("Success", "Internship successfully added!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("CompanyDashboardScreen"),
          },
        ]);
      }
    } catch (error) {
      console.error("Error posting internship:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <View style={{ padding: 16, backgroundColor: "#FFF", flex: 1 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
          borderColor: "#6D63FF",
          borderRadius: 12,
        }}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        style={{
          height: 80,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
          borderColor: "#6D63FF",
          borderRadius: 12,
        }}
      />

      <TextInput
        placeholder="Season"
        value={season}
        onChangeText={(text) => setSeason(text)}
        multiline
        style={{
          height: 80,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 12,
          padding: 8,
          borderColor: "#6D63FF",
          borderRadius: 12,
        }}
      />

      <Button
        title="Post Internship"
        onPress={handlePostInternship}
        color="#6D63FF"
        style={{ width: "8%" }}
      />
    </View>
  );
};

export default AddInternshipScreen;
