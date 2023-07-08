import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Modalize } from "react-native-modalize";
import Colors from "../../Utils/Colors";
import { hp, wp } from "../../Utils/ResponsiveSize";
import FontSize from "../../Utils/FontSize";
import Typrography from "../../Utils/Typography";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const AnalyticsModal = ({ modalVisible, onClose, ratio }) => {
  // const passedQuizzes = 4;
  // const failedQuizzes = 1;
  // const totalQuizzes = passedQuizzes + failedQuizzes;
  // const progressPercentage = (passedQuizzes / totalQuizzes) * 100;

  const { passedQuizzes, failedQuizzes, totalQuizzes, progressPercentage = 0, points } = ratio;

  return (
    <Modalize
      ref={modalVisible}
      handlePosition="inside"
      handleStyle={{
        backgroundColor: null,
      }}
      modalStyle={{
        backgroundColor: Colors.black,
        justifyContent: "flex-end",
        flex: 0.7,
        elevation: 0,
        paddingHorizontal: wp(20),
      }}
    >
      <View style={{ height: hp(24) }} />
      <Text
        style={{
          ...FontSize.rfs30,
          color: Colors.white,
          fontFamily: Typrography.headerBold,
        }}
      >
        Season Analytics
      </Text>
      <Text
        style={{
          ...FontSize.rfs15,
          fontFamily: Typrography.bold,
          color: Colors.white,
          marginTop: hp(5),
        }}
      >
        You have Played a total of
        <Text
          style={{
            ...FontSize.rfs15,
            fontFamily: Typrography.bold,
            color: Colors.primaryGreen,
            marginTop: hp(5),
          }}
        >
          {" "}
          {totalQuizzes} quizzes
        </Text>{" "}
        this season.
      </Text>
      <View style={{ height: hp(29) }} />
      <AnimatedCircularProgress
        size={wp(150)}
        width={13}
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
        fill={progressPercentage}
        tintColor={Colors.primaryGreen}
        backgroundColor={Colors.lightGray}
        rotation={0}
        lineCap="round"
        onAnimationComplete={() => console.log("Animation completed")}
      >
        {(fill) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...FontSize.rfs40,
                  color: Colors.white,
                  fontFamily: Typrography.bold,
                }}
              >
                {passedQuizzes}
              </Text>
              <Text
                style={{
                  ...FontSize.rfs16,
                  color: Colors.white,
                  fontFamily: Typrography.bold,
                  marginTop: hp(10),
                }}
              >
                /{totalQuizzes}
              </Text>
            </View>
            <Text
              style={{
                ...FontSize.rfs18,
                color: Colors.white,
                fontFamily: Typrography.bold,
                marginTop: hp(4),
                textAlign: "center",
              }}
            >
              Quizes {"\n"} Played
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={{ height: hp(33) }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.box}>
          <Text
            style={{
              ...FontSize.rfs36,
              color: Colors.primaryGreen,
              fontFamily: Typrography.bold,
              marginTop: hp(10),
            }}
          >
            {passedQuizzes}
          </Text>
          <Text
            style={{
              ...FontSize.rfs16,
              color: Colors.white,
              fontFamily: Typrography.bold,
              marginTop: hp(15),
            }}
          >
            Passed Quizes
          </Text>
        </View>
        <View style={styles.box}>
          <Text
            style={{
              ...FontSize.rfs36,
              color: Colors.red,
              fontFamily: Typrography.bold,
              marginTop: hp(10),
            }}
          >
            {failedQuizzes}
          </Text>
          <Text
            style={{
              ...FontSize.rfs16,
              color: Colors.white,
              fontFamily: Typrography.bold,
              marginTop: hp(15),
            }}
          >
            Failed Quizes
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: hp(10),
        }}
      >
        <View style={styles.box}>
          <Text
            style={{
              ...FontSize.rfs36,
              color: Colors.primaryGreen,
              fontFamily: Typrography.bold,
              marginTop: hp(10),
            }}
          >
            {progressPercentage.toFixed(0)}%
          </Text>
          <Text
            style={{
              ...FontSize.rfs16,
              color: Colors.white,
              fontFamily: Typrography.bold,
              marginTop: hp(15),
            }}
          >
            Success Rate
          </Text>
        </View>
        <View style={styles.box}>
          <Text
            style={{
              ...FontSize.rfs36,
              color: Colors.primaryGreen,
              fontFamily: Typrography.bold,
              marginTop: hp(10),
            }}
          >
            {points}
          </Text>
          <Text
            style={{
              ...FontSize.rfs16,
              color: Colors.white,
              fontFamily: Typrography.bold,
              marginTop: hp(15),
            }}
          >
            Ponts Earned
          </Text>
        </View>
      </View>
    </Modalize >
  );
};

export default AnalyticsModal;
const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  box: {
    width: wp(163),
    height: hp(95),
    backgroundColor: Colors.black_06,
    borderRadius: wp(10),

    paddingHorizontal: wp(10),
  },
});
