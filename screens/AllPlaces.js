import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { fetchPlace } from "../util/database";
export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlace();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((prev) => [...prev, route.params.place]);
    }
  }, [isFocused]);
  return <PlacesList places={loadedPlaces} />;
}
