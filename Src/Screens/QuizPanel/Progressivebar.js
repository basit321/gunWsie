import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { hp } from "../../Utils/ResponsiveSize";
import Colors from "../../Utils/Colors";

const Progressivebar = ({ totalQuizez, attempt }) => {
  const progress = (attempt / totalQuizez) * 100;
  return (
    <View style={styles.container}>
      <View
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: Colors.primaryGreen,
          borderRadius: 2,
        }}
      />
    </View>
  );
};

export default Progressivebar;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(18),
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 2,
  },
});
