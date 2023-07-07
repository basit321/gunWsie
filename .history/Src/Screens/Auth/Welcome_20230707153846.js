import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import { hp, wp } from "../../Utils/ResponsiveSize";
import Button from "../../Components/Button";
import Routes from "../../Navigation/Routes";
import UseFirebase from "../../Hooks/useFirebase";
import { orderBy, where } from "firebase/firestore";

const Welcome = ({ navigation, route }) => {
  const season = route?.params?.season;
  const quiz = route?.params?.quiz;
  const title = route?.params?.title;
  const time = route?.params?.time;
  const question = route?.params?.question;

  const { getDocuments, getDocumentsRef } = UseFirebase()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const getData = async () => {
      const res = await getDocumentsRef('quizes', setLoading, ['season'], (where('status', '==', 'active'), orderBy('createdAt', 'desc')))

      if (res.status === 400) {
        // handle any error or redirect
        return
      }

      if (res.data.length <= 0) {
        // handle redirect 
        return
      }

      setData(res.data[0])

    }

    getData()

  }, [])

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 100
        }}
      >
        <ActivityIndicator size="large" color={Colors.primaryGreen} />
      </View>
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
        <Text style={styles.primaryText}>{data?.season?.title}</Text>
        <View style={styles.box}>
          <Text
            style={{
              color: Colors.black,
              ...FontSize.rfs18,
              fontFamily: Typrography.bold,
            }}
          >
            QUIZ {data?.number}
          </Text>
        </View>
        <Text style={styles.headerText}>
          {data?.title}
        </Text>
        <Text
          style={{
            ...FontSize.rfs14,
            fontFamily: Typrography.bold,
            color: Colors.lightGray,
            marginTop: hp(3),
          }}
        >
          {data?.description}
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