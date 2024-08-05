import React from 'react'
import RenderHtml from 'react-native-render-html'
import { textColor } from '../../utils/constants'
import { Alert } from 'react-native'
import glossary from '../../../data/glossary.json'
import useStore from '../../utils/store'

export default function Paragraph({ value, width, props }) {
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)
  const setNavigateTo = useStore(state => state.setNavigateTo)

  let modifiedValue =
    `<span id="customSpan" style="font-size: 18px; color: ${textColor}; line-height: 25px; width: ${
      props?.toLeft ? width * 0.9 : 'auto'
    }px">` +
    value +
    '</span>'

  function InsRenderer({ TDefaultRenderer, ...props }) {
    const { tnode } = props

    const className = tnode.init.domNode.attribs.class
    const def = tnode.init.domNode.attribs['data-def']
    // const destination = tnode.init.domNode.attribs['data-destination']
    // const chapter = tnode.init.domNode.attribs['data-chapter']
    // const topic = tnode.init.domNode.attribs['data-topic']

    const onPress = () => {
      
      // if (destination) {
      //   setNavigateTo(destination, chapter, topic)
      //   return
      // }
      if(className !== 'def')
        return

      setBottomSheetContent(glossary[def])
      setShowBottomSheet(true)
    }

    return (
      <TDefaultRenderer
        {...props}
        onPress={onPress}
        style={{
          color: className === 'def' ? 'red' : 'blue',
          textDecorationLine: 'none',
          backgroundColor: className === 'def' ? 'rgba(255, 0, 0, .1)' : 'rgba(0, 0, 255, .1)',
        }}
      />
    )
  }

  const renderers = {
    ins: InsRenderer,
  }

  return (
    <>
      <RenderHtml
        contentWidth={width}
        source={{ html: modifiedValue }}
        renderers={renderers}
      />
    </>
  )
}
