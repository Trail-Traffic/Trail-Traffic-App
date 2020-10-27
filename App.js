import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";
import Heatmap, { PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

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

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Hello!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 50.06143,
          longitude: 19.93658,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
      >
        <Heatmap
          points={HEATMAPOINTS}
          gradient={{
            colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
            startPoints: [0, 0.25, 0.5, 0.75, 1],
            colorMapSize: 500,
          }}
        ></Heatmap>
      </MapView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
