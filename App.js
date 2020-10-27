import { StatusBar } from "expo-status-bar";
import MapView, { PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HEATMAPOINTS = [
  { latitude: 49.986111, longitude: 20.061667, weight: 1 },
  { latitude: 50.193139, longitude: 20.288717, weight: 2 },
  { latitude: 49.740278, longitude: 19.588611, weight: 1 },
  { latitude: 50.061389, longitude: 19.938333, weight: 8 },
  { latitude: 50.174722, longitude: 20.986389, weight: 900 },
  { latitude: 50.064507, longitude: 19.920777, weight: 980 },
  { latitude: 49.3, longitude: 19.95, weight: 41 },
  { latitude: 49.833333, longitude: 19.940556, weight: 660 },
  { latitude: 49.477778, longitude: 20.03, weight: 9 },
  { latitude: 49.975, longitude: 19.828333, weight: 11 },
  { latitude: 50.357778, longitude: 20.0325, weight: 233 },
  { latitude: 50.0125, longitude: 20.988333, weight: 76 },
  { latitude: 50.067959, longitude: 19.91266, weight: 630 },
  { latitude: 49.418588, longitude: 20.323788, weight: 52 },
  { latitude: 49.62113, longitude: 20.710777, weight: 300 },
  { latitude: 50.039167, longitude: 19.220833, weight: 1 },
  { latitude: 49.970495, longitude: 19.837214, weight: 780 },
  { latitude: 49.701667, longitude: 20.425556, weight: 1 },
  { latitude: 50.078429, longitude: 20.050861, weight: 1 },
  { latitude: 49.895, longitude: 21.054167, weight: 1 },
  { latitude: 50.27722, longitude: 19.569658, weight: 65 },
  { latitude: 49.968889, longitude: 20.606389, weight: 1 },
  { latitude: 49.51232, longitude: 19.63755, weight: 1 },
  { latitude: 50.018077, longitude: 20.989849, weight: 200 },
  { latitude: 50.081698, longitude: 19.895629, weight: 200 },
  { latitude: 49.968889, longitude: 20.43, weight: 500 },
  { latitude: 50.279167, longitude: 19.559722, weight: 100 },
  { latitude: 50.067947, longitude: 19.912865, weight: 690 },
  { latitude: 49.654444, longitude: 21.159167, weight: 180 },
  { latitude: 50.099606, longitude: 20.016707, weight: 800 },
  { latitude: 50.357778, longitude: 20.0325, weight: 990 },
  { latitude: 49.296628, longitude: 19.959694, weight: 1 },
  { latitude: 50.019014, longitude: 21.002474, weight: 46 },
  { latitude: 50.056829, longitude: 19.926414, weight: 22 },
  { latitude: 49.616667, longitude: 20.7, weight: 1 },
  { latitude: 49.883333, longitude: 19.5, weight: 33 },
  { latitude: 50.054217, longitude: 19.943289, weight: 1 },
  { latitude: 50.133333, longitude: 19.4, weight: 100 },
];

export default function App() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  map: {
    flex: 1,
  },
});
