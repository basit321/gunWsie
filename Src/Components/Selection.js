import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { hp, wp } from '../Utils/ResponsiveSize'
import Colors from '../Utils/Colors'
import Typrography from '../Utils/Typography'
import FonSize from '../Utils/FontSize'
const Selection = ({ onPress, image, title, description }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.firstHalf}>
        <Image source={image} style={styles.logo} />
      </View>
      <View style={styles.secondHalf}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Selection
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(72),
    borderRadius: 24,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
  },
  firstHalf: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondHalf: {
    flex: 0.8,
    justifyContent: 'center',
  },
  logo: {
    width: wp(30),
    height: hp(28),
    resizeMode: 'contain',
  },
  text: {
    ...FonSize.rfs20,
    color: Colors.blue,
    fontFamily: Typrography.bold,
  },
  description: {
    ...FonSize.rfs11,
    color: Colors.blue,
    fontFamily: Typrography.regular,
    lineHeight: 10,
  },
})
