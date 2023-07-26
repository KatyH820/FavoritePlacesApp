import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export default function OutlinedButton({ onPress, icon, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.button}>
        <Ionicons name={icon} size={24} color={Colors.button} />
        <Text style={styles.label}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5%",
    marginTop: "3%",
    backgroundColor: Colors.secondary,
    padding: "3%",
    borderRadius: 15,
  },
  label: {
    fontSize: 18,
    paddingVertical: "3%",
    paddingLeft: "1%",
  },
});
