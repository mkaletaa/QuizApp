import React from 'react';
import RenderHtml from 'react-native-render-html';



import glossary from '../../../data/glossary.json';
import useStore from '../../utils/store';
import { Colors } from 'react-native/Libraries/NewAppScreen';


// import {theory} from '../../../data/theory/theory'

export default function Paragraph({ value, width, props }) {
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const setBottomSheetContent = useStore(state => state.setBottomSheetContent)
  // const setNavigateTo = useStore(state => state.setNavigateTo)
  console.log('value: ', value, 'props: ',JSON.stringify(props) )

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
    // const id = tnode.init.domNode.attribs['data-id']
    // const destination = tnode.init.domNode.attribs['data-destination']
    // const chapter = tnode.init.domNode.attribs['data-chapter']
    // const topic = tnode.init.domNode.attribs['data-topic']

    const onPress = () => {
      // if (destination) {
      //   setNavigateTo(destination, chapter, topic)
      //   return
      // }
      // if (className === 'spoiler') {
      // let content = null //może zrobić że w Theory theory jest przekazywane do Spoiler bo
      // content ||= theory.find(el=>el.type==='Spoiler' && el.id===id)
      // setBottomSheetContent(content)
      //   setShowBottomSheet(true)
      //   return
      // }

      if (className !== 'hint') return

      setBottomSheetContent(glossary[key])
      setShowBottomSheet(true)
    }

    return (
      <TDefaultRenderer
        {...props}
        onPress={onPress}
        style={{
          color: className === 'hint' ? 'rgb(130, 0, 150)' : 'blue',
          // textDecorationLine: 'underline',
          backgroundColor:
            className === 'hint'
              ? 'rgba(130, 0, 180, .08)'
              : 'rgba(0, 0, 255, .1)',
              // height: 100,
              paddingHorizontal: 10
          // fontWeight: 'bold',
          // textDecoration: 'underline'
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