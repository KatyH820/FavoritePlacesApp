import { ScrollView, StyleSheet, Image, View, Text } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { useEffect, useLayoutEffect, useState } from "react";
import { fetchPlace, fetchPlaceDetails } from "../util/database";
import { getMapPreview } from "../util/location";
export default function PlaceDetails({ navigation, route }) {
  const [placeDetail, setPlaceDetail] = useState();
  const selectedPlaceId = route.params.id;
  const selectedPlaceTitle = route.params.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedPlaceTitle,
    });
  }, [selectedPlaceTitle]);

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setPlaceDetail(place);
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: placeDetail.lat,
      initialLng: placeDetail.lng,
    });
  }

  if (!placeDetail) {
    return (
      <View style={styles.center}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.center}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: placeDetail.imageUri }} />
        </View>

        <View style={styles.mapContainer}>
          <Image
            style={styles.img}
            source={{
              uri: getMapPreview(placeDetail.lat, placeDetail.lng),
            }}
          />
        </View>
        <Text style={styles.addressText}>{placeDetail.address}</Text>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: "3%",
  },
  center: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    padding: "10%",
    borderRadius: 15,
  },
  imgContainer: {
    width: "100%",
    height: "100%",
    marginVertical: "3%",
    marginTop: "2%",
  },
  addressText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    marginTop: "4%",
    marginBottom: "3%",
  },
});
