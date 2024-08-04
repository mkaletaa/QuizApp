import React from 'react'
import RenderHtml from 'react-native-render-html'
import { textColor } from '../../utils/constants'
import { Alert } from 'react-native'

export default function Paragraph({ value, width, props }) {
  let modifiedValue =
    `<span id="customSpan" style="font-size: 18px; color: ${textColor}; line-height: 25px; width: ${
      props?.toLeft ? width * 0.9 : 'auto'
    }px">` +
    '<ins style="color: purple" data-role="admin" id="customId">Press me!</ins> ' +
    value +
    '</span>'

  function getObjectKeys(obj, seen = new Set()) {
    // Iteracja przez klucze obiektu
    for (const key in obj) {
      // Sprawdzanie, czy obiekt ma dany klucz (pomijanie dziedziczonych)
      if (obj.hasOwnProperty(key)) {
        // Sprawdzanie, czy wartość klucza nie jest `undefined`
        if (obj[key] !== undefined) {
          console.log(key) // Wypisanie klucza
        }
      }
    }
  }

  function InsRenderer({ TDefaultRenderer, ...props }) {
    const {
      textProps, //{"selectable":false,"allowFontScaling":true}
      tagName, //undefined
      children, //undefined
      node,
      propsFromParent, //{"collapsedMarginTop":null}
      attribs, //undefined
      type, //text
      tnode,
      sharedProps, //*
      TNodeChildrenRenderer,
      style, //{"fontSize":18,"color":"purple","lineHeight":25,"textDecorationLine":"underline","textDecorationStyle":"solid"}
      propsForChildren, //{}
      InternalRenderer, //undefined ?
      renderIndex, //0
      renderLength, //3
      viewProps, //{}
    } = props
    // const id = domNode

    const onPress = () => {
      console.log(`Props: ${JSON.stringify(tnode.init.domNode.attribs['id'])}`)
    }

    return (
      <TDefaultRenderer
        {...props}
        onPress={onPress}
        style={{ color: 'blue', textDecorationLine: 'underline' }} // Optional: Styling for interactivity
      />
    )
  }

  const renderers = {
    ins: InsRenderer,
  }

  return (
    <RenderHtml
      contentWidth={width}
      source={{ html: modifiedValue }}
      renderers={renderers}
    />
  )
}
