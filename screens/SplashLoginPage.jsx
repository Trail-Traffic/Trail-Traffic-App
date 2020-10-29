import React, { Component, useEffect, useState } from "react";
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
  TouchableWithoutFeedback,
} from "react-native";
import * as Google from "expo-google-app-auth";
import secret from "../secrets";
import { MapPage } from "./MapPage.jsx";
import App from "../App";

const IOS_CLIENT_ID = secret.google_client_id;
const FB_APP_ID = secret.facebook_app_id;

export function Splash({ navigation }) {
  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        scopes: ["profile", "email"],
      });
      //successful Google login
      if (result.type === "success") {
        const user = result.user;
        //insert user into database if user doesn't exist
        const postObj = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.givenName,
            photourl: user.photoUrl,
          }),
        };
        fetch(`http://${secret.ip_address}:5001/api/addUser`, postObj)
          .then((res) => res.json())
          .then((userInfo) => {
            //reroute to map view
            console.log("frontend ", userInfo);
            navigation.navigate("Map");
          });
        //return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("../assets/logo.png")} />
      <TouchableOpacity>
        <TouchableWithoutFeedback onPress={signInWithGoogle}>
          <View style={styles.googleButton}>
            <Image source={require("../assets/google2.png")}></Image>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </View>
  );
  }

 cnst styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
    veContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
   mp: {
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
  ;
  },
})