import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import Colors from "../Utils/Colors";
import { hp, wp } from "../Utils/ResponsiveSize";
import Typrography from "../Utils/Typography";
import FontSize from "../Utils/FontSize";
import Images from "../Assets/Images";
const Button = ({
  buttonStyle,
  textStyle,
  title,
  onPress,
  textAlignLeft = false,
  showDropDownIcon = false,
  disabled,
  activeOpacity,
  key,
}) => {
  return (
    // Button Style depends on textAlignLeft prop //
    <TouchableOpacity
      activeOpacity={activeOpacity}
      key={key}
      disabled={disabled}
      style={
        textAlignLeft
          ? [styles.buttonContainer, buttonStyle]
          : [styles.container, buttonStyle]
      }
      onPress={onPress}
    >
      {disabled == true ? (
        <View
          style={{
            width: "100%",
            height: hp(56),
            backgroundColor:
              disabled == true ? "rgba(64, 64, 64, 1)" : Colors.white,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* /// Text Style depends on textAlignLeft prop // */}
          <Text
            style={
              textAlignLeft
                ? [styles.contText, textStyle]
                : [styles.buttontext, textStyle]
            }
          >
            {title}
          </Text>
          {showDropDownIcon ? (
            <Image source={Images.dropDown} style={styles.dropDown} />
          ) : null}
        </View>
      ) : (
        <>
          <Text
            style={
              textAlignLeft
                ? [styles.contText, textStyle]
                : [styles.buttontext, textStyle]
            }
          >
            {title}
          </Text>
          {showDropDownIcon ? (
            <Image source={Images.dropDown} style={styles.dropDown} />
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(56),
    backgroundColor: Colors.white,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    height: hp(67),
    backgroundColor: Colors.gray,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(25),
  },
  buttontext: {
    ...FontSize.rfs20,
    color: Colors.black,
    fontFamily: Typrography.bold,
  },
  contText: {
    ...FontSize.rfs21,
    color: Colors.black,
    fontFamily: Typrography.regular,
  },
  dropDown: {
    width: wp(12),
    height: hp(12),
    resizeMode: "contain",
  },
});
