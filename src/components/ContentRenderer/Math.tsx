import React from 'react'
import { Pressable, ScrollView, Touchable, View } from 'react-native'
// import MathJax from 'react-native-mathjax'
import WebView from 'react-native-webview'

//todo zmienić 325 na coś innego
export default function Math({ width = 325, value = null, props = null }) {
  let html =
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=AM_CHTML"></script><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><div style="display: flex;justify-content: center;align-items: center; overflow-x:auto; "><div style="max-width: 100%;margin: 0 auto;font-size:15px">'
  html += value
  html += '</div></div>'

  return (
    // <View style={{ height: 70, width: '100%', backgroundColor: 'blue' }}>

    <WebView
      scrollEnabled={false}
      // onMessage={this.handleMessage.bind(this)}
      source={{ html }}
      // {...props}
      //todo: zmienić 320 na jakiś inny width
      style={{
        width: 300,
        height: 70,
        backgroundColor: 'transparent',
    
      }}
      //scalesPageToFit={true}
    />
    //</View>
  )
}
