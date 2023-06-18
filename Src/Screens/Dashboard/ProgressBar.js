import React from "react";
import { View, StyleSheet } from "react-native";
import { hp, wp } from "../../Utils/ResponsiveSize";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Colors from "../../Utils/Colors";

const ProgressBar = ({ totalQuizzes, attempts }) => {
  const progressPercentage = (attempts / totalQuizzes) * 100;

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressBackground: {
    width: wp(150),
    height: hp(150),
    borderRadius: wp(100),
    backgroundColor: "gray",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgressBar;
