import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Animated,
  Alert,

} from "react-native";
import React, { useEffect, useRef } from "react";
import Images from "../..//Assets/Images";
import Typrography from "../../Utils/Typography";
import Colors from "../../Utils/Colors";
import { hp, wp } from "../..//Utils/ResponsiveSize";
import Routes from "../../Navigation/Routes";
import Button from "../../Components/Button";
import FontSize from "../../Utils/FontSize";
import * as Application from 'expo-application';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import UseFirebase from "../../Hooks/useFirebase";
import useAuth from "../../Hooks/useAuth";


const Login = ({ navigation }) => {


  const { addDocumentWithId, updateDocument } = UseFirebase()
  const { setUser } = useAuth()

  GoogleSignin.configure({

    webClientId: '523865209818-uk1knvjke7vnpb5vqpnkakjbn3qpu884.apps.googleusercontent.com',
    offlineAccess: true,
  });
  async function onGoogleButtonPress() {
    try {
      GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the user's ID token
      const { accessToken, idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken, accessToken);

      // Sign in the user with the credential
      const login = await auth().signInWithCredential(credential);

      const newUser = login.additionalUserInfo.isNewUser

      if (newUser) {
        const user = {
          provider: 'google',
          email: login.user.email,
          name: login.user.displayName,
          avatar: login.user.photoURL,
          uid: login.user.uid,
        }

        await addDocumentWithId('users', login.user.uid, user)

      } else {
        const user = {
          email: login.user.email,
          name: login.user.displayName,
          avatar: login.user.photoURL,
        }

        await updateDocument('users', login.user.uid, user)

        setUser({
          ...user,
          uid: login.user.uid
        })

      }






      // Show an alert for successful login and authentication
      // await AsyncStorage.setItem("@UserProfile", JSON.stringify(login));
      navigation.navigate(Routes.Welcome);

    } catch (error) {
      if (error.message === 'Sign in action cancelled') {
        // Handle sign-in cancellation
        console.log('Sign-in cancelled by the user');
      } else if (error.message === 'Another operation is already in progress') {
        // Handle sign-in in progress
        console.log('Sign-in is already in progress');
      } else if (error.message === 'Play services are not available') {
        // Handle Play Services not available
        Alert.alert("PLEASE ENABLE PLAY SERVICE")
      } else {
        // Handle other errors
        Alert.alert("NetworkError")
      }
    }
  }



  return (
    <ImageBackground source={Images.backGround} style={styles.container}>
      <View style={{ ...styles.container, backgroundColor: null, paddingHorizontal: wp(20), }}>
        <View style={{ height: hp(58) }} />
        <Text style={styles.headerText}>
          Welcome  To {"\n"}Gun Wise
        </Text>
        <Image style={{ width: wp(220), height: hp(220), resizeMode: "contain", marginTop: hp(140), alignSelf: "center" }} source={Images.logo} />
      </View>
      <Button buttonStyle={{ width: "90%", alignSelf: "center", backgroundColor: "#4285F4" }}
        title={"Sign In  With Google"}
        textStyle={{ color: Colors.white }}
        onPress={onGoogleButtonPress}
      />
      <View style={{ height: hp(40) }} />
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    resizeMode: "contain",
    backgroundColor: "black",
  },
  headerText: {
    color: Colors.white,
    ...FontSize.rfs40,
    fontFamily: Typrography.headerBold

  },
});
