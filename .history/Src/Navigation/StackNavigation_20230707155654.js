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
  Summary,
  Login,
} from "../Screens";
import QuizIntro from "../Screens/QuizPanel/Intro";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
          <Stack.Screen name={Routes.Login} component={Login} />
          <Stack.Screen name={Routes.Welcome} component={Welcome} />
          <Stack.Screen name={Routes.Dashoard} component={Dashboard} />
          <Stack.Screen name={Routes.CounterScreen} component={CounterScreen} />
          <Stack.Screen name={Routes.Quiz} component={Quiz} />
          <Stack.Screen name={Routes.Sumary} component={Summary} />
          <Stack.Screen name={Routes.QuizIntro} component={QuizIntro} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default StackNavigation;

