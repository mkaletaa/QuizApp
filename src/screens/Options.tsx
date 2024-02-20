import React from 'react'
import { View, StyleSheet } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import {LinearGradient} from 'expo-linear-gradient'

export default function Options() {
  return (
    // <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={['transparent', '#3b5998', 'transparent']}
        style={{width: 50, height: 50}}
      >
      </LinearGradient>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: 100,
    aspectRatio: 16 / 9, // Example aspect ratio (adjust as needed)
  },
})
