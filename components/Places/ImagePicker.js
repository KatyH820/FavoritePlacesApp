import { View, Button, Alert, Image } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { StyleSheet } from "react-native";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

export default function ImagePicker({ onTakeImage }) {
  const [imgUri, setImgUri] = useState();
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [photoPermissionInfo, requestPhotoPermission] =
    useMediaLibraryPermissions();

  async function verifyCameraPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionRes = await requestPermission();
      return permissionRes.granted;
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permissions to use this functionality"
      );
      return false;
    }

    return true;
  }

  async function verifyPhotoAlbumPermission() {
    if (photoPermissionInfo === PermissionStatus.UNDETERMINED) {
      const res = await requestPhotoPermission();
      return res.granted;
    }
    if (photoPermissionInfo === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant photo library access permissions to use this functionality"
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyCameraPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setImgUri(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
  }

  async function pickImageHandler() {
    const hasPermission = await verifyPhotoAlbumPermission();
    if (!hasPermission) {
      return;
    }
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setImgUri(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
  }

  return (
    <View>
      <View style={styles.imgPrev}>
        {imgUri && <Image style={styles.img} source={{ uri: imgUri }} />}
        {!imgUri && (
          <Image
            style={styles.img}
            source={require("../../assets/imgs/upload.png")}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton icon="camera" onPress={takeImageHandler}>
          Take Photo
        </OutlinedButton>
        <OutlinedButton icon="albums" onPress={pickImageHandler}>
          From Album
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  imgPrev: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "5%",
  },

  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
