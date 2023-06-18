import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import React from 'react'
const ScreenWrapper = ({ children, style, model = false, ref, req = true }) => {
  return (
    <View style={{ flex: 1 }} ref={ref}>
      <View style={[styles.containerMain]}>
        <KeyboardAvoidingView
          style={[styles.containerMain, style]}
          behavior={Platform.OS === 'ios' ? 'padding' : req ? 'height' : null}
        >
          {children}
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
  },
})
