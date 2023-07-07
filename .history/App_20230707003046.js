import { View, StyleSheet, LogBox } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native"; /// this is for navigation///

import StackNavigation from "./Src/Navigation/StackNavigation"; // this is for stack navigation//
import { GestureHandlerRootView } from "react-native-gesture-handler"; // this is for gesture handler//

import * as Font from 'expo-font';

import * as SplashScreen from "expo-splash-screen"; /// this is for hide Splash and load fonts//
import { StatusBar } from "expo-status-bar";

export const navigationRef = createNavigationContainerRef(); /// this is for navigation///
LogBox.ignoreAllLogs();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false); /// this is for font loading//
  useEffect(() => {
    fetchFonts();
  }, []);

  const fetchFonts = async () => {
    try {
      await SplashScreen.preventAutoHideAsync(); /// this is for hide Splash and load fonts//

    } catch (e) {
      //console.log('Error occurred while loading custom fonts:', e);
    } finally {
      setFontLoaded(true);
      SplashScreen.hideAsync();
    }
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <StackNavigation />
        </View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
