import React, { useEffect, useState } from "react";
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
import { MapPage } from "./screens/MapPage.jsx";
import { Splash } from "./screens/SplashLoginPage.jsx";

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-community/google-signin";

// GoogleSignin.configure();

//========================================= FAVORITES PAGE ================================================//

function Favorites({ navigation }) {
  const [trails, setTrails] = useState([]);
  const [like, setDislike] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });

  useEffect(() => {
    fetch("http://192.168.0.197:5001/api/getData")
      .then((res) => res.json())
      .then((res) => setTrails(res))
      .catch((err) => console.log(err));
  }, []);

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
        {trails.map((trail, i) => {
          return (
            <Card key={i}>
              <ListItem>
                <Text style={styles.trailListText}>{trail.longitude}</Text>
                <Ionicons
                  name="ios-heart"
                  style={like ? styles.heartIconRed : styles.heartIconGray}
                  onPress={() => setDislike(!like)}
                />
              </ListItem>
            </Card>
          );
        })}
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
  heartIconRed: {
    color: "red",
    fontSize: 25,
    alignItems: "flex-end",
  },
  heartIconGray: {
    color: "#DCDCDC",
    fontSize: 25,
    alignItems: "flex-end",
  },
  trailListText: {
    fontSize: 20,
    textAlign: "center",
  },
});
