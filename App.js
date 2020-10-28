import React, { useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const HEATMAPOINTS = [
  { latitude: 49.986111, longitude: 20.061667, weight: 1 },
  { latitude: 50.193139, longitude: 20.288717, weight: 2 },
  { latitude: 49.740278, longitude: 19.588611, weight: 1 },
  { latitude: 50.061389, longitude: 19.938333, weight: 8 },
  { latitude: 50.174722, longitude: 20.986389, weight: 11 },
  { latitude: 50.064507, longitude: 19.920777, weight: 98 },
  { latitude: 49.3, longitude: 19.95, weight: 41 },
  { latitude: 49.833333, longitude: 19.940556, weight: 66 },
];

const fetchData = [];

function MapPage() {
  useEffect(() => {
    fetch("http://192.168.1.3:5001/api/getData")
      .then((res) => res.json())
      .then((res) => console.log("data", res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 50.06143,
          longitude: 19.93658,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
      >
        <Heatmap
          points={HEATMAPOINTS}
          radius={50}
          gradient={{
            colors: ["#0DE5FF", "#0D14FF", "#980DFF", "#FF0DED", "#E50000"],
            startPoints: [0.01, 0.25, 0.5, 0.75, 1],
            colorMapSize: 256,
          }}
        />
      </MapView>
    </View>
  );
}

function Splash({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./assets/logo.png")} />
      {/* <Text>Splash page</Text> */}
      <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Splash} />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  map: {
    flex: 1,
  },
});
