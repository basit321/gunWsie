import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Images from "../../Assets/Images";
import Colors from "../../Utils/Colors";
import Typrography from "../../Utils/Typography";
import FontSize from "../../Utils/FontSize";
import Routes from "../../Navigation/Routes";
import UseFirebase from "../../Hooks/useFirebase";
import { arrayUnion, documentId, where } from "firebase/firestore";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loading";

const CounterScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const { user } = useAuth()
  // //console.log('questions: ', route.params.quiz);

  const { getDocuments, updateDocument, addDocumentWithId, getReference } = UseFirebase()

  useEffect(() => {

    if (loading) return

    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1500);

    // Clean up the timer when component unmounts
    return () => clearInterval(timer);
  }, [loading]);


  useEffect(() => {

    const getData = async () => {

      try {
        // const questions = [];

        setLoading(true)

        let res = await getDocuments('questions');

        if (res.status === 400) {
          console.log('res ', res.error);
          throw new Error(res.error)
          return
        }
        const totalQuestions = res.data;

        const allIds = totalQuestions.map(doc => doc.id);

        const questionLength = totalQuestions.length;

        if (questionLength < 20) {
          Alert.alert('Error getting questions: ', 'Not enough questions');
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
          console.log('res1 ', res.error);
          throw new Error(res.error)
          return
        }

        setQuestions(res.data)
        console.log(user.uid);

        const season = await updateDocument('seasons', route.params.quiz.season.id, {
          users: arrayUnion(user.uid)
        })

        if (season.status === 400) {
          console.log('res2 ', season.error);
          throw new Error(season.error)
        }

        const quiz = await updateDocument('quizes', route.params.quiz.id, {
          users: arrayUnion(user.uid)
        })

        if (quiz.status === 400) {
          throw new Error(season.error)
        }

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

        if (result.status === 400) {
          console.log('res3 ', result.error);
          throw new Error(result.error)
        }

        setLoading(false)

      } catch (error) {
        //console.log('Error getting questions: ', error);
        Alert.alert(
          "Error getting questions",
          "try another quiz",
          [
            {
              text: "ok",
              onPress: () => { setLoading(false), navigation.goBack() }
            },
          ],
          { cancelable: false }
        );


      }

    }

    getData()

  }, [])

  useEffect(() => {

    if (loading) return

    setTimeout(() => {
      if (count === 1) {

        navigation.navigate(Routes.Quiz, {
          questions,
          quiz: route?.params?.quiz,
        });
      }

      if (count === 0) {
        setCount(3)
      }
    }, 1000);
  }, [count, loading]);

  return (
    <ImageBackground source={Images.primaryBackground} style={styles.container}>
      {loading && <Loader />}
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
