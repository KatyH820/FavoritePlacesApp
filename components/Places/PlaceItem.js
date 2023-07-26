import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/colors";

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      onPress={onSelect.bind(this, place.id, place.title)}
      style={({ pressed }) => [styles.outer, pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{place.title}</Text>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: place.imgUri }} />
        </View>

        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    paddingVertical: "8%",
    paddingHorizontal: "3%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "95%",
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pressed: { opacity: 0.5 },
  imgContainer: {
    width: "100%",
    height: "100%",
  },
  img: {
    flex: 1,
    borderRadius: 10,
    padding: "15%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: "1%",
  },
  address: {
    fontWeight: "bold",
    paddingTop: "3%",
  },
});
