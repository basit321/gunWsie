import { View, StyleSheet, LogBox } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native"; /// this is for navigation///

import StackNavigation from "./Src/Navigation/StackNavigation"; // this is for stack navigation//
import { GestureHandlerRootView } from "react-native-gesture-handler"; // this is for gesture handler//

import * as Font from "expo-font"; // <---
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
      await Font.loadAsync({
        font: require("./Src/Assets/Fonts/font.ttf"),
        primayFont: require("./Src/Assets/Fonts/primayFont.otf"),
        number: require("./Src/Assets/Fonts/number.ttf"),
      });
    } catch (e) {
      console.warn(e);
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
