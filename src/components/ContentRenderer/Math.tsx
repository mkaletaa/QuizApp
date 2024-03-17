import React from 'react'
import MathJax from 'react-native-mathjax'

//todo to z powrotem do ContentRenderer
export default function Math({width, value, props}) {
  return (
    <MathJax
      style={{
        backgroundColor: 'yellow',
        width: width - 30,
        // marginLeft: 20
        // height: 200,
      }} //TODO: change 324 to screen width
      html={'<span>' + value + '</span>'}
      size={props?.fontSize ? props.fontSize : 18}
    />
  )
}
