import React from 'react'
import RenderHtml from 'react-native-render-html'
import { textColor } from '../../utils/constants'


export default function Paragraph({value, width, props}) {
      let modifiedValue =
        `<span style=" font-size: 18px; color: ${textColor}; line-height: 25px; width: ${
          props?.toLeft ? width * 0.9 : null
        }px">` +
        '<span>Press me!</span>' +
        value +
        '</span>'

      function H1Renderer({ TDefaultRenderer, ...props }) {
        const onPress = () => console.log('pressed!')
        return <TDefaultRenderer {...props} onPress={onPress} />
      }

      const renderers = {
        span: H1Renderer,
      }

      return (
        <RenderHtml
          contentWidth={width}
          source={{ html: modifiedValue }}
          renderers={renderers}
        />
      )
}