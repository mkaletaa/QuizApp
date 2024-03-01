import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'

const source = {
  html: `
<p style='text-align:center; font-size: 30px'>
  <b>Hello World!</b>d
</p>`,
}
export default function Settings() {
  const { width } = useWindowDimensions()
  return <RenderHtml contentWidth={width} source={source} />
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
