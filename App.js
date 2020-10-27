import { StatusBar } from "expo-status-bar";
import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Hello!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <MapView
      style={{ flex: 1 }}
      // provider={PROVIDER_GOOGLE}
      showsUserLocation
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
