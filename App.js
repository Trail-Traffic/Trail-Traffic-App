import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MapPage } from "./screens/MapPage.jsx";
import { Splash } from "./screens/SplashLoginPage.jsx";
import { Faves } from "./screens/Faves"

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
          name="Faves"
          component={Faves}
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
