import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Heatmap, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-community/google-signin";

// GoogleSignin.configure();

//========================================= MAP PAGE ================================================//
function MapPage() {
  const [trails, setTrails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("http://192.168.1.3:5001/api/getData")
      .then((res) => res.json())
      .then((res) => setTrails(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 34.052235,
          longitude: -118.243683,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
      >
        {trails.map((marker, i) => (
          <Marker
            key={i}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          />
        ))}
        <Heatmap
          points={trails}
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

//========================================= SPLASH/LOGIN PAGE ================================================//

function Splash({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("./assets/logo.png")} />
      <Icon.Button name="facebook" backgroundColor="#3b5998">
        Login with Facebook
      </Icon.Button>
      <TouchableOpacity>
        <View style={styles.googleButton}>
          <Image source={require("./assets/google2.png")}></Image>
        </View>
      </TouchableOpacity>
      {/* <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      /> */}
    </View>
  );
}

//========================================= FAVORITES PAGE ================================================//

function Favorites({ navigation }) {
  const [trails, setTrails] = useState([]);

  return (
    <SafeAreaView style={styles.faveContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Button
            title="Back to Map"
            onPress={() => navigation.navigate("Map")}
          />
          <Button title="Logout" onPress={() => navigation.navigate("Login")} />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("./assets/cat.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            Grumpy Cat
          </Text>
        </View>
        <View style={styles.faveTitle}>
          <Text style={[styles.text, { fontSize: 24 }]}>Favorite Trails</Text>
        </View>
        <Card style={styles.cardContainer}>
          <Ionicons name="ios-heart" style={styles.heartIcon} />
          {trails.map((trail, i) => {
            return <ListItem key={i} title={trail.longitude} />;
          })}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

//========================================= MAIN APP COMPONENT ================================================//

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Splash}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-heart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//========================================= STYLING ================================================//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  faveContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  googleText: {
    color: "#616161",
    fontSize: 14,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  faveTitle: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 45,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    display: "flex",
  },
  heartIcon: {
    color: "red",
    fontSize: 25,
    alignItems: "flex-end",
  },
});
