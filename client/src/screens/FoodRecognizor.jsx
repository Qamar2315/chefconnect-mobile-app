import React, { useState, useEffect } from "react";
import { View, Text, Image, Platform, PermissionsAndroid } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImagePicker from "react-native-image-picker";
import { ActivityIndicator } from "react-native-paper";
import { BASE_URL_FLASK } from "../../config";

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  predictionContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  predictionText: {
    fontSize: 18,
    fontWeight: "bold",
  },
};

const FoodRecognizer = () => {
  const [imagePath, setImagePath] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchImageLibrary();
      }
    } else {
      launchImageLibrary();
    }
  };

  const launchImageLibrary = () => {
    const options = {
      title: "Select Food Image",
      storageOptions: {
        skipBackup: true, // Prevent image from being backed up to iCloud/Google Photos
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image selection");
      } else if (response.error) {
        console.error("Image picker error:", response.error);
      } else {
        setImagePath(response.uri);
        // Replace with your actual prediction logic (e.g., sending image to Flask server)
        setPrediction(
          "This is a placeholder prediction. Replace with your model's output."
        );
      }
    });
  };

  useEffect(() => {
    // Implement your prediction logic here when imagePath changes (optional)
    if (imagePath) {
      setIsLoading(true);
      // Send image to Flask server and handle response
      // (Replace with your actual API call)
      fetch(`${BASE_URL_FLASK}/api/predict`, {
        method: "POST",
        body: new FormData({ image: { uri: imagePath, name: "image.jpg" } }), // Adjust as needed
      })
        .then((response) => response.json())
        .then((data) => {
          setPrediction(data.prediction);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching prediction:", error);
          setIsLoading(false);
        });
    }
  }, [imagePath]);

  return (
    <View style={styles.container}>
      <FoodImageInput
        imagePath={imagePath}
        isLoading={isLoading}
        onImageSelected={launchImageLibrary}
      />
      <PredictionResult prediction={prediction} />
    </View>
  );
};

const FoodImageInput = ({ imagePath, isLoading, onImageSelected }) => (
  <View style={styles.imageContainer}>
    {imagePath ? (
      <Image source={{ uri: imagePath }} style={styles.image} />
    ) : (
      <Button mode="contained" onPress={requestCameraPermission}>
        Select Food Image
      </Button>
    )}
    {isLoading && <ActivityIndicator animating size="small" />}
  </View>
);

const PredictionResult = ({ prediction }) => (
  <View style={styles.predictionContainer}>
    <Text style={styles.predictionText}>
      {prediction ? `Prediction: ${prediction}` : "Waiting for prediction..."}
    </Text>
  </View>
);

export default FoodRecognizer;
