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
    const destination = tnode.init.domNode.attribs['data-destination']
    const def = tnode.init.domNode.attribs['data-def']

    const onPress = () => {
      console.log("🚀 ~ onPress ~ destination:", destination)
      
      if (destination) {
        setNavigateTo('Settings')
        return
      }
      // if(destination) {
      //   // Alert.alert(`${JSON.stringify(tnode.init.domNode.attribs)}`)
      //   return
      // }
      setBottomSheetContent(glossary[def])
      setShowBottomSheet(true)
    }

    return (
      <TDefaultRenderer
        {...props}
        onPress={onPress}
        style={{
          color: 'red',
          textDecorationLine: 'none',
          backgroundColor: 'rgba(255, 0, 0, .1)',
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
