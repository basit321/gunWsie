import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import Routes from "../../Navigation/Routes";
import UseFirebase from "../../Hooks/useFirebase";
import { documentId, where } from "firebase/firestore";

const CounterScreen = ({ navigation }) => {
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])

  const { getDocuments } = UseFirebase()

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1500);

    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {

    const getData = async () => {

      try {
        // const questions = [];

        let res = await getDocuments('questions', setLoading);

        if (res.status === 400) {
          // handle any error or redirect
          return
        }
        const totalQuestions = res.data;

        const allIds = totalQuestions.map(doc => doc.id);

        const questionLength = totalQuestions.length;

        const randomNumbers = [];
        while (randomNumbers.length < 5) {
          const randomNumber = Math.floor(Math.random() * questionLength);

          const randomId = allIds[randomNumber];

          if (!randomNumbers.includes(randomId)) {
            randomNumbers.push(randomId);
          }
        }

        res = await getDocuments('questions', setLoading, where(documentId(), 'in', randomNumbers));

        if (res.status === 400) {
          // handle any error or redirect
          return
        }

        setQuestions(res.data)

      } catch (error) {
        //console.log('Error getting questions: ', error);
      }

    }

    getData()

  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (count === 1) {

        navigation.navigate(Routes.Quiz, {
          questions,
        });

        setCount(5);
      }
    }, 1000);
  }, [count]);

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      <Text style={styles.primaryText}>{count}</Text>
    </ImageBackground>
  );
};

export default CounterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
  primaryText: {
    color: Colors.white,
    ...FontSize.rfs112,
    fontFamily: Typrography.number,
  },
});
