import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import Routes from "../../Navigation/Routes";
import UseFirebase from "../../Hooks/useFirebase";
import { arrayUnion, documentId, where } from "firebase/firestore";
import useAuth from "../../Hooks/useAuth";

const CounterScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const { user } = useAuth()
  // //console.log('questions: ', route.params.quiz);

  const { getDocuments, updateDocument, addDocumentWithId, getReference } = UseFirebase()

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

        setLoading(true)

        let res = await getDocuments('questions');

        if (res.status === 400) {
          // handle any error or redirect
          setLoading(false)
          return
        }
        const totalQuestions = res.data;

        const allIds = totalQuestions.map(doc => doc.id);

        const questionLength = totalQuestions.length;

        if (questionLength < 20) {
          // handle any error or redirect

          setLoading(false)
          return
        }

        const randomNumbers = [];
        while (randomNumbers.length < 20) {
          const randomNumber = Math.floor(Math.random() * questionLength);

          const randomId = allIds[randomNumber];

          if (!randomNumbers.includes(randomId)) {
            randomNumbers.push(randomId);
          }
        }

        res = await getDocuments('questions', null, where(documentId(), 'in', randomNumbers));

        if (res.status === 400) {
          // handle any error or redirect
          setLoading(false)
          return
        }

        setQuestions(res.data)

        const season = await updateDocument('seasons', route.params.quiz.season.id, {
          users: arrayUnion(user.uid)
        })

        const quiz = await updateDocument('quizes', route.params.quiz.id, {
          users: arrayUnion(user.uid)
        })

        const result = await addDocumentWithId('results', user.uid + route.params.quiz.id, {
          user: user.uid,
          userRef: getReference('users', user.uid),
          quiz: route.params.quiz.id,
          quizRef: getReference('quizes', route.params.quiz.id),
          season: route.params.quiz.season.id,
          seasonRef: getReference('seasons', route.params.quiz.season.id),
          status: 'pending',
          result: 'N/A'
        })

        setLoading(false)

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
          quiz: route?.params?.quiz,
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
