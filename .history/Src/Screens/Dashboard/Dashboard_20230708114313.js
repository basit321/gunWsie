import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import { hp, wp } from "../../Utils/ResponsiveSize";
import Button from "../../Components/Button";
import { quizType, anaLytics } from "./Data";
import AnalyticsModal from "./AnalyticsModal";
import Routes from "../../Navigation/Routes";
import { auth } from "../../Config/firebase";
import useAuth from "../../Hooks/useAuth";
import UseFirebase from "../../Hooks/useFirebase";
import { where } from "firebase/firestore";
import Loader from "../../Components/Loading";
import { useFocusEffect } from "@react-navigation/native";

const Dashboard = ({ navigation }) => {
  const modalizeRef = useRef(null);
  const [season, setSeason] = useState({
    id: 1,
  });

  const { getDocuments, getDocumentsRef } = UseFirebase()
  const [quizes, setQuizes] = useState([])
  const [loading, setLoading] = useState(false)
  const [seasons, setSeasons] = useState([])
  const [history, setHistory] = useState([])
  const [anaLytics, setAnaLytics] = useState([])
  const [ratio, setRatio] = useState({})

  const anaLyticsLength = anaLytics.length;

  const { user } = useAuth()

  useFocusEffect(
    React.useCallback(() => {

      const getQuizes = async () => {
        // console.log('user: ', user)
        const quizes = await getDocumentsRef('quizes', setLoading, ['season'], (where('status', '==', 'active')))

        // console.log(quizes.data)

        if (quizes.status === 400) {
          console.log(quizes.error)
          return
        }

        // filter data where user is not included
        const filteredData = quizes.data.filter(quiz => !quiz.users.includes(user.uid))

        setQuizes(filteredData)
      }

      const getHistory = async () => {
        const history = await getDocumentsRef('results', setLoading, ['seasonRef', 'quizRef'], where('user', '==', user.uid))

        if (history.status === 400) {
          // console.log(history.error)
          return
        }

        const data = history.data

        setHistory(data)

        // only select data of unique season from seasonRef
        let seasons = []
        let seasonIds = []
        data.map(item => {
          if (!seasonIds.includes(item.seasonRef.id)) {
            seasonIds.push(item.seasonRef.id)
            seasons.push(item.seasonRef)
          }
        })

        setSeasons(seasons)
        setSeason({ id: seasons[0].id })
        const anaLytics = data.filter(item => item.seasonRef.id === seasons[0].id)

        setAnaLytics(anaLytics)



      }

      getHistory()
      getQuizes()

    }, [])

  );


  useEffect(() => {

    if (!season.id) return

    const anaLytics = history.filter(item => item.seasonRef.id === season.id)

    // const passedQuizzes = 4;
    // const failedQuizzes = 1;

    let passed = 0;
    let failed = 0;
    history.map(item => {
      console.log(item.correct)
      if (item.result === 'passed') {
        passed += 1
      } else {
        failed += 1
      }

      console.log(typeof item.correct)

      // if(typeof item.correct ) {
      //   item.correct = 0
      // }

    })

    setRatio({
      passedQuizzes: passed,
      failedQuizzes: failed,
      totalQuizzes: passed + failed,
      progressPercentage: (passed / (passed + failed)) * 100
    })

    setAnaLytics(anaLytics)

  }, [season])

  // console.log(user)

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      {loading && <Loader />}
      <View style={{ flex: 1, marginLeft: "5%" }}>
        <View>
          <View style={{ height: hp(80) }} />

          <Text
            style={{
              color: Colors.primaryGreen,
              ...FontSize.rfs24,
              fontFamily: Typrography.headerBold,
            }}
          >
            WELCOME
          </Text>

          <Text style={styles.headerText}>{user.name}</Text>
          <View style={{ height: hp(20) }} />
          <FlatList
            data={quizes}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.quixBox}>
                <View style={{ height: hp(21) }} />
                <Text
                  style={{
                    ...FontSize.rfs14,
                    color: Colors.black,
                    fontFamily: Typrography.bold,
                  }}
                >
                  {item.season.title}
                </Text>
                <View style={styles.box}>
                  <Text
                    style={{
                      color: Colors.black,
                      ...FontSize.rfs14,
                      fontFamily: Typrography.bold,
                    }}
                  >
                    Quiz {item.number}
                  </Text>
                </View>
                <Text style={styles.quizTitleText}>{item.title}</Text>
                <View style={styles.rowView}>
                  <Image
                    source={Images.card}
                    style={{
                      width: wp(24),
                      height: hp(24),
                      tintColor: Colors.black,
                    }}
                  />
                  <Text
                    style={{
                      ...FontSize.rfs14,
                      color: Colors.black,
                      marginLeft: wp(7),
                    }}
                  >
                    20 QUESTIONS
                  </Text>
                </View>
                <View style={styles.rowView}>
                  <Image
                    source={Images.clock}
                    style={{
                      width: wp(20),
                      height: hp(20),
                      tintColor: Colors.black,
                    }}
                  />
                  <Text
                    style={{
                      ...FontSize.rfs14,
                      color: Colors.black,
                      marginLeft: wp(13),
                    }}
                  >
                    20 mints ALLOWED
                  </Text>
                </View>
                <Button
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  title="START QUIZ"
                  onPress={() => {
                    // add dashboard to stack navigation

                    // navigation.navigate(Routes.Dashoard)

                    navigation.navigate(Routes.QuizIntro, {
                      id: item.id,
                    })
                  }
                  }
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <Text
            style={{
              marginTop: hp(24),
              ...FontSize.rfs20,
              fontFamily: Typrography.bold,
              color: Colors.white,
            }}
          >
            HISTORY
          </Text>
          <View style={{ height: hp(16) }} />
          <FlatList
            data={seasons}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Button
                buttonStyle={{
                  width: wp(88),
                  height: hp(25),
                  backgroundColor:
                    item.id === season.id ? Colors.primaryGreen : null,
                  borderRadius: 4,
                  borderWidth: item.id === season.id ? null : 1,
                  borderColor: Colors.lightGray,
                  marginRight: wp(10),
                }}
                textStyle={{
                  color:
                    item.id === season.id ? Colors.black : Colors.lightGray,
                  ...FontSize.rfs14,
                  fontFamily: Typrography.bold,
                }}
                title={item.title}
                onPress={() => setSeason({ id: item.id })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={{ height: hp(17) }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...FontSize.rfs15,
                fontFamily: Typrography.bold,
                color: Colors.white,
              }}
            >
              {anaLyticsLength} QUIZZES
            </Text>

            <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
              <Image
                source={Images.analytics}
                style={{
                  width: wp(28),
                  height: hp(28),
                  marginRight: "3%",
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: hp(17) }} />
        </View>
        <FlatList
          data={anaLytics}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: "5%" }}
          renderItem={({ item, index }) => {
            // console.log(item)
            return (
              <View
                style={{
                  ...styles.anaLyticsBox,
                  marginTop: (index = 0 ? null : hp(16)),
                }}
              >
                <View style={{ height: hp(9) }} />
                <Text
                  style={{
                    ...FontSize.rfs14,
                    fontFamily: Typrography.bold,
                    color: Colors.white,
                  }}
                >
                  {item.seasonRef.title} | QUIZ {item.quizRef.number}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    ...FontSize.rfs22,
                    fontFamily: Typrography.headerBold,
                    marginTop: hp(8),
                  }}
                >
                  {item.quizRef.title}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: hp(18),
                  }}
                >
                  {
                    item.status === 'completed' ?
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                          source={Images.right}
                          style={{ width: wp(14), height: hp(11) }}
                        />
                        <Text
                          style={{
                            ...FontSize.rfs16,
                            fontFamily: Typrography.bold,
                            color: Colors.white,
                            marginLeft: wp(10),
                          }}
                        >
                          {item.correct}
                        </Text>
                        <Image
                          source={Images.cross}
                          style={{
                            width: wp(12),
                            height: hp(12),
                            marginLeft: wp(26),
                          }}
                        />
                        <Text
                          style={{
                            ...FontSize.rfs16,
                            fontFamily: Typrography.bold,
                            color: Colors.white,
                            marginLeft: wp(10),
                          }}
                        >
                          {item.wrong}
                        </Text>
                      </View>
                      : <View />
                  }
                  <Button
                    title={item.result}
                    buttonStyle={{
                      width: wp(85),
                      height: hp(25),
                      backgroundColor:
                        item.result === "passed"
                          ? Colors.primaryGreen
                          : Colors.red,
                      borderRadius: 4,

                    }}
                    textStyle={{
                      ...FontSize.rfs14,
                      textTransform: 'capitalize'
                    }}
                  />
                </View>
              </View>
            )
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <AnalyticsModal modalVisible={modalizeRef} ratio={ratio} />
    </ImageBackground>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.black,
  },
  primaryText: {
    color: Colors.primaryGreen,
    ...FontSize.rfs18,
    fontFamily: Typrography.bold,
  },
  box: {
    height: hp(25),
    width: wp(61),
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
    borderRadius: 12,
    width: wp(247),
    height: hp(291),
    backgroundColor: Colors.white,
    marginRight: wp(20),
    paddingHorizontal: wp(11),
  },
  rowView: {
    flexDirection: "row",

    alignItems: "center",
    marginTop: hp(18),
  },
  quizTitleText: {
    color: Colors.black,
    ...FontSize.rfs24,
    fontFamily: Typrography.headerBold,
    marginTop: hp(12),
  },
  button: {
    width: wp(152),
    height: hp(40),
    backgroundColor: Colors.black,
    marginTop: hp(30),
  },
  buttonText: {
    color: Colors.white,
    ...FontSize.rfs18,
    fontFamily: Typrography.bold,
  },
  anaLyticsBox: {
    width: "95%",
    height: hp(115),
    backgroundColor: Colors.black_06,
    borderRadius: 8,
    paddingHorizontal: wp(11),
  },
});
