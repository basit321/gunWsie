import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { hp, wp } from '../Utils/ResponsiveSize'
import Typrography from '../Utils/Typography'
import FontSize from '../Utils/FontSize'
import Images from '../Assets/Images'
const Input = ({ value, onChangeText, placeholder }) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      value={value}
      style={styles.container}
      placeholder={placeholder}
      placeholderTextColor={Colors.gray_02}
    />
  )
}

export default Input
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(58),
    backgroundColor: Colors.gray,
    borderRadius: 12,

    paddingHorizontal: wp(25),
    ...FontSize.rfs21,
    color: Colors.black,
    fontFamily: Typrography.regular,
  },
  buttontext: {
    ...FontSize.rfs21,
    color: Colors.blue,
    fontFamily: Typrography.bold,
  },
  contText: {
    ...FontSize.rfs21,
    color: Colors.black,
    fontFamily: Typrography.regular,
  },
  dropDown: {
    width: wp(12),
    height: hp(12),
    resizeMode: 'contain',
  },
})
