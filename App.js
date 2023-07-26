import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "./screens/PlaceDetails";
const Stack = createNativeStackNavigator();
export default function App() {
  const [dbInitialized, setDBInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => setDBInitialized(true))
      .catch((err) => console.log(err));
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: { fontSize: 20 },
            headerStyle: {
              backgroundColor: Colors.background,
            },
            contentStyle: {
              backgroundColor: Colors.background,
            },
            headerTintColor: Colors.contrast,
            presentation: "modal",
            animation: "flip",
            // headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={30}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate("AddPlace");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add A New Place",
            }}
          />
          <Stack.Screen
            name="PlaceDetail"
            component={PlaceDetails}
            options={{
              title: "Place Detail",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
