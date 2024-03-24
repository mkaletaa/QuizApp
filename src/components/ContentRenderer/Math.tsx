import React from 'react'
import { View } from 'react-native'
import MathJax from 'react-native-mathjax'
import WebView from 'react-native-webview'

//todo to z powrotem do ContentRenderer
export default function Math({ width = 300, value = null, props = null }) {
  let html =
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2"><div style="display: flex;justify-content: center;align-items: center; overflow-x:auto; "><div style="max-width: 100%;margin: 0 auto;font-size:20px">'
  html += value
  html += '</div></div>'

  return (
    // <View style={{height: 60,}}>
    <WebView
      scrollEnabled={false}
      // onMessage={this.handleMessage.bind(this)}
      source={{ html }}
      // {...props}
      style={{ width, height: 60, backgroundColor: 'transparent' }}
      //scalesPageToFit={true}
    />
    // {/* </View> */}
  )
}
