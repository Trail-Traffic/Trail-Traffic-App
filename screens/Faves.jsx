import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import secret from "../secrets";

export function Faves({ navigation, route }) {
  const { userInfo } = route.params;
  const [faves, setFaves] = useState([]);

  useEffect(() => {
    fetch(
      `http://${secret.ip_address}:5001/api/getFaves?user_id=${userInfo.id}`
    )
      .then((res) => res.json())
      .then((parsedRes) => setFaves(parsedRes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView style={styles.faveContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Button
            title="Back to Map"
            onPress={() => navigation.navigate("Map", { userInfo })}
          />
          <Button title="Logout" onPress={() => navigation.navigate("Login")} />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: userInfo.photourl }}
              style={styles.image}
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
            {userInfo.name}
          </Text>
        </View>
        <View style={styles.faveTitle}>
          <Text style={[styles.text, { fontSize: 24 }]}>Favorite Trails</Text>
        </View>
        {faves.map((trail, i) => {
          return (
            <Card key={i}>
              <ListItem>
                <Text style={styles.trailListText}>{trail}</Text>
                <Ionicons
                  key={i}
                  name="ios-heart"
                  style={styles.heartIconRed}
                />
              </ListItem>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  faveContainer: {
    flex: 1,
    backgroundColor: "#fff",
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