import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share
} from "react-native";
import React from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import { hp, wp } from "../../Utils/ResponsiveSize";
import Button from "../../Components/Button";
import Routes from "../../Navigation/Routes";

const Summary = ({ navigation, route }) => {

  const { correct, wrong, total } = route.params

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'www.gunwise.com/odumqDjdd',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ height: hp(85) }} />
        <Image style={{ width: "100%", height: hp(244) }} source={Images.reward}
          resizeMode="contain"
        />
        <Image style={{ width: "70%", height: hp(64), marginTop: hp(23), alignSelf: "center" }} source={Images.rewardText}
          resizeMode="contain"
        />
        <Text
          style={{
            ...FontSize.rfs18,
            color: Colors.white,
            textAlign: "center",
            marginTop: hp(5)

          }}
        >
          YOU earned {correct} Points
        </Text>
        <Text
          style={{
            ...FontSize.rfs24,
            color: Colors.white,

            marginTop: hp(59)

          }}
        >
          SUMMARY
        </Text>
        <View style={styles.quixBox}>
          <View style={styles.rowView}>
            <Text
              style={{
                ...FontSize.rfs14,
                color: Colors.white,
                lineHeight: 22
              }}
            >
              CORRECT ANSWERS {"\n"}
              <Text
                style={{
                  ...FontSize.rfs18,
                  color: Colors.primaryGreen,
                }}
              >
                {correct}
              </Text>
            </Text>
            <Text
              style={{
                ...FontSize.rfs14,
                color: Colors.white,
                lineHeight: 22
              }}
            >
              WRONG ANSWERS{"\n"}
              <Text
                style={{
                  ...FontSize.rfs18,
                  color: Colors.red,
                }}
              >
                {wrong}
              </Text>
            </Text>
          </View>
          <View style={{ ...styles.rowView, marginTop: hp(16), }}>
            <Text
              style={{
                ...FontSize.rfs14,
                color: Colors.white,

              }}
            >
              SUCCESS RATE{"\n"}
              <Text
                style={{
                  ...FontSize.rfs18,
                  color: Colors.primaryGreen,
                }}
              >
                {correct / total * 100}%
              </Text>
            </Text>
            <Text
              style={{
                ...FontSize.rfs14,
                color: Colors.white,




              }}
            >
              STATUS{"                    "}{"\n"}
              <Text
                style={{
                  ...FontSize.rfs18,
                  color: correct / total * 100 >= 50 ? Colors.primaryGreen : Colors.red,
                }}
              >
                {correct / total * 100 >= 50 ? "PASS" : "FAIL"}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title={"CONTINUE"}
          onPress={() => {
            navigation.navigate(Routes.Dashoard);
          }}
          buttonStyle={{ width: hp(267) }}
        />
        <TouchableOpacity style={styles.shareButton} onPress={onShare} >
          <Image source={Images.share} style={{ width: wp(23), height: hp(19) }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: hp(45) }} />
    </ImageBackground>
  );
};

export default Summary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
    backgroundColor: Colors.black,
  },
  primaryText: {
    color: Colors.primaryGreen,
    ...FontSize.rfs18,
    fontFamily: Typrography.bold,
  },
  box: {
    height: hp(25),
    width: wp(74),
    backgroundColor: Colors.primaryGreen,
    borderRadius: wp(5),
    marginTop: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: Colors.white,
    ...FontSize.rfs40,
    fontFamily: Typrography.headerBold,
    marginTop: hp(16),
  },
  quixBox: {
    borderRadius: 5,
    marginTop: hp(12),
    width: "100%",
    height: hp(132),
    backgroundColor: Colors.black_06,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: wp(18),
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(18),
  },
  shareButton: {
    width: wp(56),
    height: hp(56),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: "center",
    alignItems: "center"
  }
})