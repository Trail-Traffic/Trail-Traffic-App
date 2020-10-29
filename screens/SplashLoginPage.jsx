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

export function Splash({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("../assets/logo.png")} />
        <Icon.Button name="facebook" backgroundColor="#3b5998">
          Login with Facebook
        </Icon.Button>
        <TouchableOpacity>
          <View style={styles.googleButton}>
            <Image source={require("../assets/google2.png")}></Image>
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