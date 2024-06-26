import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Text, Provider, ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL_FLASK } from "../../config";
import { AuthContext } from "../helpers/Auth";
import { useContext } from "react";

const RecognizeProduceScreen = () => {
  const [image, setImage] = useState(null);
  const [produceType, setProduceType] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userSession } = useContext(AuthContext);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Image selected from gallery:", uri);
      setImage(uri);
      setProduceType("");
    }
  };

  const handleTakePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Photo taken with camera:", uri);
      setImage(uri);
      setProduceType("");
    }
  };

  const handleRecognizeProduce = async () => {
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "produce.jpg",
      });

      try {
        const response = await axios.post(
          `${BASE_URL_FLASK}/api/predict-calories`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userSession.token}`,
            },
          }
        );
        if (response.data.success) {
            console.log(response.data);
            setProduceType(response.data);
        //   setProduceType(response.data.produceType);
        } else {
          alert("Recognition failed, please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred, please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select or take an image first.");
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={handlePickImage}
          style={styles.button}
        >
          Pick an Image from Gallery
        </Button>
        <Button
          mode="contained"
          onPress={handleTakePhoto}
          style={styles.button}
        >
          Take a Photo
        </Button>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button
          mode="contained"
          onPress={handleRecognizeProduce}
          style={styles.button}
        >
          Recognize Produce
        </Button>
        {loading && (
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loading}
          />
        )}
        {produceType && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Recognized Produce: {produceType.name}
            </Text>
            <Text style={styles.resultText}>
              Catagory: {produceType.category}
            </Text>
            <Text style={styles.resultText}>
              Calories: {produceType.calories_per_100g}
            </Text>
          </View>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    marginVertical: 10,
    width: "80%",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  loading: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecognizeProduceScreen;
