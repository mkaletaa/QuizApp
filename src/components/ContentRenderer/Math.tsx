import React from 'react'
import { View, Pressable, TouchableWithoutFeedback } from 'react-native'
import WebView from 'react-native-webview'

export default function Math({ width, value, props }) {
  let html = `
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=AM_CHTML"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        #math-container {
          overflow-x: auto;
          max-width: 100%;
          font-size: ${props?.fontSize ? props.fontSize : 15}px;
          height: ${props?.height ? props.height : 70}px;
          display: flex;
          align-items: center;
          padding-right: ${width * 0.05}px !important;
          padding-left: ${width * 0.05}px;
        }
      </style>
    </head>
    <body>
      <div id="math-container">${value}</div>
    </body>
    </html>
  `

  return (
    <View
      style={{
        width: width,
      }}
      onStartShouldSetResponder={event => true}
      onTouchEnd={e => {
        e.stopPropagation()
      }}
    >

        <WebView
          onStartShouldSetResponder={() => true}
          scrollEnabled={false}
          source={{ html }}
          style={{
            width: width,
            height: props?.height ? props.height : 70,
            backgroundColor: 'transparent',
          }}
        />
    </View>
  )
}
