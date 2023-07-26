import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

export default function CustomButton({ onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  button: {
    marginTop: "2%",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    margin: "1%",
    backgroundColor: Colors.customButton,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 1.5,
      height: 1.5,
    },
    shadowRadius: 4,
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
