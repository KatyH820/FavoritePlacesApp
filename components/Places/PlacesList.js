import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";
export default function PlacesList({ places }) {
  const navigation = useNavigation();
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  function selectHandler(id, title) {
    navigation.navigate("PlaceDetail", { id: id, title: title });
  }

  function renderHandler(itemData) {
    return <PlaceItem place={itemData.item} onSelect={selectHandler} />;
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderHandler}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
