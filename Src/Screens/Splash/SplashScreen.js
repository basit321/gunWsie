import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Images from "../..//Assets/Images";
import { hp, wp } from "../..//Utils/ResponsiveSize";
import Routes from "../../Navigation/Routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
   


    const navigatetoNextScreen = async () => {
     const val= await AsyncStorage.getItem('@UserProfile');
     
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 2000, // Duration for the animation (in milliseconds)
        useNativeDriver: true, // Enable native driver for performance
      }).start();
      setTimeout(() => {
        if(val==undefined||val==""||val==null)
        {
        navigation.navigate(Routes.Login);
        }
        else{
          navigation.navigate(Routes.Welcome);
        }
      }, 2000);
    };
    navigatetoNextScreen();
  }, []);

  const initialWidth = wp(27);
  const initialHeight = hp(39);
  const targetWidth = wp(297);
  const targetHeight = hp(207);

  const animatedStyle = {
    transform: [
      {
        scaleX: scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [initialWidth / targetWidth, 1],
        }),
      },
      {
        scaleY: scaleValue.interpolate({
          inputRange: [0, 1],
          outputRange: [initialHeight / targetHeight, 1],
        }),
      },
    ],
  };

  return (
    <ImageBackground source={Images.backGround} style={styles.container}>
      <Animated.Image
        style={[{ width: targetWidth, height: targetHeight }, animatedStyle]}
        source={Images.logo}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    backgroundColor: "black",
  },
});
