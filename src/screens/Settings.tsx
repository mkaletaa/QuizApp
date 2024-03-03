import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { WebView } from 'react-native-webview'

const source = {
  html: `
<p style='text-align:center; font-size: 30px'>
  <b>Hello World!</b>d
</p>`,
}
export default function Settings() {
 const htmlContent = '<p style="font-size: 60px">Hello, <b>World</b></p>'

 return <RenderHtml contentWidth={360} source={source} />
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
