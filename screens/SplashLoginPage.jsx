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
  TouchableWithoutFeedback
} from "react-native";
import { Card, ListItem } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Google from "expo-google-app-auth";
import secret from "../secrets"

const IOS_CLIENT_ID = secret.google_client_id;

export function Splash({ navigation }) {

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        // androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        this.props.navigation.navigate("Profile", {
          username: result.user.givenName
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };

  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/logo.png")} />
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => console.log('clicked facebook')}>
          Login with Facebook
        </Icon.Button>
        <TouchableOpacity>
          <TouchableWithoutFeedback onPress={signInWithGoogle}>
            <View style={styles.googleButton}>
              <Image source={require("../assets/google2.png")}></Image>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
        {/* <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        /> */}
      </View>
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
})