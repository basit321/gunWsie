import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import { hp, wp } from "../../Utils/ResponsiveSize";
import Button from "../../Components/Button";
import Routes from "../../Navigation/Routes";

const Welcome = ({ navigation, route }) => {
  const season = route?.params?.season;
  const quiz = route?.params?.quiz;
  const title = route?.params?.title;
  const time = route?.params?.time;
  const question = route?.params?.question;

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ height: hp(58) }} />
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.Dashoard)}
          style={{ marginLeft: "auto" }}
        >
          <Text
            style={{
              ...FontSize.rfs15,
              fontFamily: Typrography.bold,
              color: Colors.white,
            }}
          >
            See More
          </Text>
        </TouchableOpacity>
        <View style={{ height: hp(68) }} />
        <Text style={styles.primaryText}>SEASON {season ? season : 1}</Text>
        <View style={styles.box}>
          <Text
            style={{
              color: Colors.black,
              ...FontSize.rfs18,
              fontFamily: Typrography.bold,
            }}
          >
            QUIZ {quiz ? quiz : 1}
          </Text>
        </View>
        <Text style={styles.headerText}>
          {title ? title : "CALL OF DUTY THE finest hour"}
        </Text>
        <Text
          style={{
            ...FontSize.rfs14,
            fontFamily: Typrography.bold,
            color: Colors.lightGray,
            marginTop: hp(3),
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Lorem in tempus amet
          scelerisque semper adipiscing. Proin feugiat etiam tellus morbi nulla
          eu commodo.
        </Text>
        <View style={styles.quixBox}>
          <View style={styles.rowView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={Images.card}
                style={{ width: wp(24), height: hp(24) }}
              />
              <Text
                style={{
                  ...FontSize.rfs16,
                  color: Colors.white,
                  marginLeft: wp(15),
                }}
              >
                QUESTIONS
              </Text>
            </View>
            <Text
              style={{
                ...FontSize.rfs16,
                color: Colors.primaryGreen,
                marginLeft: wp(15),
              }}
            >
              {question ? question : 15}
            </Text>
          </View>
          <View style={styles.rowView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={Images.clock}
                style={{ width: wp(20), height: hp(20) }}
              />
              <Text
                style={{
                  ...FontSize.rfs16,
                  color: Colors.white,
                  marginLeft: wp(15),
                }}
              >
                TIME ALLOWED
              </Text>
            </View>
            <Text
              style={{
                ...FontSize.rfs16,
                color: Colors.primaryGreen,
                marginLeft: wp(15),
              }}
            >
              {time ? time : "5 Min"}
            </Text>
          </View>
        </View>
      </View>
      <Button
        title={"GET STARTED"}
        onPress={() => {
          navigation.navigate(Routes.CounterScreen);
        }}
      />
      <View style={{ height: hp(45) }} />
    </ImageBackground>
  );
};

export default Welcome;
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
    marginTop: hp(32),
    width: "100%",
    height: hp(114),
    backgroundColor: Colors.black_06,
    borderWidth: 1,
    borderColor: Colors.white,
    paddingHorizontal: wp(23),
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(20),
  },
});
