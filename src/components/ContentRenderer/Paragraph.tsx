import React from 'react'
import { Text } from 'react-native'
import RenderHtml from 'react-native-render-html'

import glossary from '../../../data/glossary.json'
import { Colors } from '../../utils/constants'
import useStore from '../../utils/store'

export default function Paragraph({ value, width, props }) {
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)

  let modifiedValue =
    `<span id="customSpan" style="font-size: 18px; color: ${Colors.text}; line-height: 25px; width: ${
      props?.center ? 'auto' : width * 0.9
    }px; letter-spacing: .3px">` +
    value +
    '</span>'

  function InsRenderer({ TDefaultRenderer, ...props }) {
    const { tnode } = props

    const className = tnode.init.domNode.attribs.class
    const key = tnode.init.domNode.attribs['data-key']

    const originalText = tnode.domNode.children
      .map(child => child.data || '')
      .join('')

    const onPress = () => {
      if (className === 'hint') {
        setBottomSheetContent(glossary[key])
        setShowBottomSheet(true)
      }
    }

    switch (className) {
      case 'hint':
        return (
          <Text
            onPress={onPress}
            style={{
              color: '#362988',
              backgroundColor: '#c9c3ed', //e4e1ef //c7c6f4 //d7d2f1
            }}
          >
            &nbsp;
            {originalText}
            &nbsp;
          </Text>
        )
      default:
        return (
          <Text
            // onPress={onPress}
            style={{
              color: Colors.text,
              backgroundColor: 'rgba(106, 90, 205, .12)', //e4e1ef //c7c6f4 //d7d2f1

              // backgroundColor: '#e4e1f6', //e4e1ef //c7c6f4 //d7d2f1
              fontStyle: 'italic',
            }}
          >
            &nbsp; 
            {originalText}
            &nbsp;
          </Text>
        )
    }
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
