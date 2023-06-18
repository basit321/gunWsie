import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";

import { hp, wp } from "../../Utils/ResponsiveSize";

const Timer = ({ onTimeFinish }) => {
  const [remainingTime, setRemainingTime] = useState(3 * 60 + 59);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current);
          onTimeFinish();
          // Timer has finished, perform any action needed
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return (
    <View style={styles.box}>
      <Image
        source={Images.clock}
        style={{ width: wp(11), height: hp(11), tintColor: Colors.white }}
      />
      <Text
        style={{
          color: Colors.white,
          ...FontSize.rfs14,
          fontFamily: Typrography.bold,
          marginLeft: wp(7),
        }}
      >
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

export default Timer;
const styles = StyleSheet.create({
  box: {
    width: wp(90),
    height: hp(26),
    backgroundColor: Colors.black_06,
    borderRadius: 3,
    justifyContent: "center",

    flexDirection: "row",
    alignItems: "center",
  },
  primaryText: {
    color: Colors.white,
    ...FontSize.rfs112,
    fontFamily: Typrography.number,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
