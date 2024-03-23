import React from 'react'
import { View } from 'react-native'
import MathJax from 'react-native-mathjax'
import WebView from 'react-native-webview'

//todo to z powrotem do ContentRenderer
export default function Math({width=300, value=null, props=null}) {

  let html =
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2"><div style="display: flex;justify-content: center;align-items: center; overflow-x:auto; "><div style="max-width: 100%;margin: 0 auto;font-size:20px">'
    html +=
      '<math xmlns="http://www.w3.org/1998/Math/MathML"> <mstyle displaystyle="true"> <msubsup> <mi>∑</mi> <mrow> <mi>i</mi> <mo>=</mo> <mn>0</mn> </mrow> <mi>n</mi>jj </msubsup> <msup> <mi>i</mi> <mn>2</mn> </msup> <mo>=</mo> <mfrac> <mrow> <mo>(</mo> <mi>n</mi> <msup> <mo>(</mo> <mi>n</mi> <mo>+</mo> <mn>1</mn> <mo><>)</ mo></mo> </msup> <mo>(</mo> <mn>2</mn> <mi>n</mi> <mo>+</mo> <mn>1</mn> <mo>)wwwwwwww)</mo> </mrow> <mn>6</mn> </mfrac> </mstyle> wwwwwwwwww</math>'
    html+='</div></div>'
    
  return (
    // <View style={{height: 60,}}>
      <WebView
        scrollEnabled={false}
        // onMessage={this.handleMessage.bind(this)}
        source={{ html }}
        // {...props}
        style={{ width, height: 60,  backgroundColor: 'transparent' }}
        //scalesPageToFit={true}
      />
    // {/* </View> */}
  )
}
