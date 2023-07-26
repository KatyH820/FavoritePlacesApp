import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet } from "react-native";
import { View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import CustomButton from "../UI/CustomButton";
import { Place } from "../../models/place";

export default function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);
  function savePlacecHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View style={styles.all}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          value={enteredTitle}
          onChangeText={changeTitleHandler}
          style={styles.textInput}
        />
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <CustomButton onPress={savePlacecHandler}>Add Place</CustomButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: "8%",
  },
  all: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  textInput: {
    borderRadius: 13,
    backgroundColor: Colors.secondary,
    fontSize: 16,
    padding: "3%",
  },
});
