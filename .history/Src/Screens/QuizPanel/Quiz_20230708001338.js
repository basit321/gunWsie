import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../../Components/Button";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import Routes from "../../Navigation/Routes";
import { hp, wp } from "../../Utils/ResponsiveSize";
import Progressivebar from "./Progressivebar";
import Timer from "./timer";
import { quizSet } from "./Data";
import { useIsFocused } from "@react-navigation/native";

const Quiz = ({ navigation, route }) => {

  const [quizData, setQuizData] = useState(route.params.questions);
  const isFocused = useIsFocused()
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);


  const popup = () => {
    Alert.alert(
      "Are you sure you want to quit?",
      "Your progress will be lost",
      [
        {
          text: "Cancel",
          onPress: () => //console.log("Cancel Pressed"),
            style: "cancel",
        },
        {
          text: "Quit",
          onPress: () => navigation.navigate(Routes.Dashoard),
        },
      ],
      { cancelable: false }
    );
  };
  const onQuizTimeEnd = () => {

    Alert.alert(
      "Time's up!",
      "Your quiz time is over",
      [
        {
          text: "ok",
          onPress: () => navigation.navigate(Routes.Dashoard),
        },
      ],
      { cancelable: false }
    );
  }


  const onPressNext = () => {
    if (quizIndex < quizData.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    } else {

      Alert.alert(
        "Quiz Completed",
        "Your quiz is completed",
        [
          {
            text: "ok",
            onPress: () => { navigation.navigate(Routes.Sumary) },
          },
        ],
        { cancelable: false }
      );
    }
  };
  const showOutput = () => {
    //console.log(quizData[quizIndex].type);
    switch (quizData[quizIndex].type) {
      case "4OptionAnswer":
        return (
          <View>
            <Text style={styles.primaryText}>
              {quizIndex + 1}
              {". "}
              {quizData[quizIndex].title}

            </Text>
            <View style={{ marginTop: hp(33) }} />
            <FlatList
              data={quizData[quizIndex].options}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity
                    onPress={() => setSelectedOption(index)}
                    style={{
                      flexDirection: "row",
                      marginTop: index === 0 ? 0 : hp(20),
                      paddingHorizontal: wp(16),
                      alignItems: "center",

                      width: "100%",
                      height: hp(55),
                      backgroundColor:
                        index === selectedOption
                          ? Colors.green_05
                          : Colors.black_05,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor:
                        index === selectedOption
                          ? Colors.primaryGreen
                          : Colors.lightGray,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        ...FontSize.rfs20,
                        fontFamily: Typrography.bold,
                      }}
                    >
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        );
      case "4ImageAnswer":
        return quizData[quizIndex]?.options.length > 3 && (
          <>
            <FlatList
              data={quizData[quizIndex].options}
              numColumns={2}
              ListHeaderComponent={
                <Text style={styles.primaryText}>
                  {quizIndex + 1}
                  {". "}
                  {quizData[quizIndex].title}
                </Text>
              }
              key={"#"}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => setSelectedOption(index)}
                  style={{
                    width: wp(158),
                    height: hp(158),
                    marginRight: index % 2 === 0 ? wp(12) : 0,
                    marginTop: index === 0 || index === 1 ? hp(33) : hp(16),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      index === selectedOption
                        ? Colors.green_05
                        : Colors.black_05,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor:
                      index === selectedOption
                        ? Colors.primaryGreen
                        : Colors.lightGray,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: wp(140),
                      height: hp(140),
                      borderRadius: 4,
                    }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        );
      case '3ImageAnser':
        return (
          <View>
            <Text style={styles.primaryText}>
              {quizIndex + 1}
              {". "}
              {quizData[quizIndex].title}
            </Text>
            <View style={{ marginTop: hp(33) }} />
            <FlatList
              data={quizData[quizIndex].options}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity
                    onPress={() => setSelectedOption(index)}
                    style={{
                      flexDirection: "row",
                      marginTop: index === 0 ? 0 : hp(20),
                      paddingHorizontal: wp(16),
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: hp(113),
                      backgroundColor:
                        index === selectedOption
                          ? Colors.green_05
                          : Colors.black_05,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor:
                        index === selectedOption
                          ? Colors.primaryGreen
                          : Colors.lightGray,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: "99%",
                        height: hp(95),
                        borderRadius: 4,
                      }}
                    />
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        );
      case "ImageQuestion":
        return (
          <View>
            <Text style={styles.primaryText}>
              {quizIndex + 1}
              {". "}
              {quizData[quizIndex].question}
            </Text>
            <View style={{ marginTop: hp(6) }} />
            <View
              style={{
                paddingHorizontal: wp(16),
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: hp(151),
                backgroundColor: Colors.black_05,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: Colors.lightGray,
              }}
            >
              <Image
                source={{ uri: quizData[quizIndex].questionImg }}
                style={{
                  width: "99%",
                  height: hp(133),
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={{ marginTop: hp(24) }} />
            <FlatList
              data={quizData[quizIndex].options}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity
                    onPress={() => setSelectedOption(index)}
                    style={{
                      flexDirection: "row",
                      marginTop: index === 0 ? 0 : hp(20),
                      paddingHorizontal: wp(16),
                      alignItems: "center",

                      width: "100%",
                      height: hp(55),
                      backgroundColor:
                        index === selectedOption
                          ? Colors.green_05
                          : Colors.black_05,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor:
                        index === selectedOption
                          ? Colors.primaryGreen
                          : Colors.lightGray,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                        ...FontSize.rfs20,
                        fontFamily: Typrography.bold,
                      }}
                    >
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: hp(62) }} />
        <View style={styles.header}>
          <Text
            style={{
              color: Colors.primaryGreen,
              ...FontSize.rfs20,
              fontFamily: Typrography.bold,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Quiz
          </Text>
          <TouchableOpacity
            onPress={() => popup()}
            style={{ right: 0, position: "absolute" }}
          >
            <Image
              source={Images.circle}
              style={{ width: wp(41), height: hp(41) }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: hp(29) }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: Colors.white,
              ...FontSize.rfs14,
              fontFamily: Typrography.bold,
            }}
          >
            {quizIndex + 1}/{quizData.length}
          </Text>
          {isFocused && (
            <Timer
              time={20 * 60}
              onTimeFinish={onQuizTimeEnd} />
          )}

        </View>
        <View style={{ marginTop: hp(11) }} />
        <Progressivebar totalQuizez={quizData.length} attempt={quizIndex + 1} />
        <View style={{ marginTop: hp(42) }} />
        {showOutput()}
      </View>
      <Button
        title="Next"
        onPress={() => onPressNext()}
        disabled={selectedOption == null ? true : false}
      />
      <View style={{ height: hp(40) }} />
    </ImageBackground>
  );
};

export default Quiz;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(21),
    backgroundColor: Colors.black,
  },
  primaryText: {
    color: Colors.white,
    ...FontSize.rfs24,
    fontFamily: Typrography.headerBold,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});
