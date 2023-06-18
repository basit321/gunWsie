import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Routes";
import {
  SplashScreen,
  Welcome,
  Dashboard,
  CounterScreen,
  Quiz,
} from "../Screens";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
          <Stack.Screen name={Routes.Welcome} component={Welcome} />
          <Stack.Screen name={Routes.Dashoard} component={Dashboard} />
          <Stack.Screen name={Routes.CounterScreen} component={CounterScreen} />
          <Stack.Screen name={Routes.Quiz} component={Quiz} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default StackNavigation;
