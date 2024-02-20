import React from 'react'
import { View, StyleSheet } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

export default function Options() {
  return (
    // <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={'iee2TATGMyI'}
        onChangeState={()=>{}}
      />
    //{/* </View> */}
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
