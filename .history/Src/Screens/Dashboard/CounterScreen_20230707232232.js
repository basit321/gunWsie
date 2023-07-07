import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import Routes from "../../Navigation/Routes";
import UseFirebase from "../../Hooks/useFirebase";

const CounterScreen = ({ navigation }) => {
  const [count, setCount] = useState(3);

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
        const questions = [];

        const totalQuestions = await getDocuments('questions');

        const allIds = totalQuestions.docs.map(doc => doc.id);

        const questionLength = totalQuestions.size;

        const randomNumbers = [];
        while (randomNumbers.length < 3) {
          const randomNumber = Math.floor(Math.random() * questionLength);

          const randomId = allIds[randomNumber];

          if (!randomNumbers.includes(randomId)) {
            randomNumbers.push(randomId);
          }
        }

        const querySnapshot = await getDocs(query(collection(db, 'questions'), where(documentId(), 'in', randomNumbers)));

        querySnapshot.forEach(async (doc) => {
          questions.push({
            id: doc.id,
            ...doc.data()
          });
        });

        return questions;

      } catch (error) {
        //console.log('Error getting questions: ', error);
      }

    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (count === 1) {
        navigation.navigate(Routes.Quiz, {

        });
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
