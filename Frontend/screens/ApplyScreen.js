// UploadFile.js
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import InternshipContext from "../context/InternshipContext";

const UploadFile = () => {
  const { userId } = useAuth();

  const [resume, setResume] = useState("");
  const [essay, setEssay] = useState("");

  const route = useRoute();
  const { internship } = route.params;
  const { apply } = useContext(InternshipContext);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setResume(result.assets[0].uri);
  };

  const submitApplication = async () => {
    const formData = new FormData();
    formData.append("internship", internship._id);
    formData.append("applier", userId);
    formData.append("essay", essay);

    if (resume) {
      const localUri = resume;
      const filename = localUri.split("/").pop();

      formData.append("file", {
        uri: localUri,
        name: filename,
        type: "application/pdf",
      });
    }

    const result = await apply(formData);

    if (result && result.error) {
      alert(result.message);
    } else {
      showToast("Application submitted Successfully");
    }
  };

  // toast Funtion
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  return (
    <View style={styles.background}>
      <Text style={styles.file}>Upload CV and Essay</Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          placeholder="Write your essay here..."
          multiline
          numberOfLines={5}
          value={essay}
          onChangeText={(text) => setEssay(text)}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button title="Upload CV" color="#6D63FF" onPress={pickDocument} />
        </TouchableOpacity>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button
            title="Submit Application"
            color="#6D63FF"
            onPress={submitApplication}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: 100,
  },
  file: {
    color: "black",
  },
  textAreaContainer: {
    borderColor: "#6D63FF",
    borderRadius: 12,
    borderWidth: 1,
    padding: 5,
    margin: 10,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
  },
  button: {
    marginHorizontal: 60,
    padding: 10,
  },
});

export default UploadFile;
