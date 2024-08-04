import React from 'react'
import RenderHtml from 'react-native-render-html'
import { textColor } from '../../utils/constants'
import { Alert } from 'react-native'
import glossary from '../../../data/glossary.json'
// import Spoiler from './Spoiler'
import useStore from '../../utils/store'

export default function Paragraph({ value, width, props }) {
    const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
    const setBottomSheetContent = useStore(state => state.setBottomSheetContent)

  let modifiedValue =
    `<span id="customSpan" style="font-size: 18px; color: ${textColor}; line-height: 25px; width: ${
      props?.toLeft ? width * 0.9 : 'auto'
    }px">` +
    // '<ins data-role="admin" id="hello">Press me!</ins> ' +
    value +
    '</span>'

//   function getObjectKeys(obj, seen = new Set()) {
//     // Iteracja przez klucze obiektu
//     for (const key in obj) {
//       // Sprawdzanie, czy obiekt ma dany klucz (pomijanie dziedziczonych)
//       if (obj.hasOwnProperty(key)) {
//         // Sprawdzanie, czy wartość klucza nie jest `undefined`
//         if (obj[key] !== undefined) {
//           console.log(key) // Wypisanie klucza
//         }
//       }
//     }
//   }

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

    const id = tnode.init.domNode.attribs['id']
    const onPress = () => {
        
    //   Alert.alert(`${glossary[id]}`)

    setBottomSheetContent(glossary[id])
      setShowBottomSheet(true)
    //   Alert.alert(`Props: ${JSON.stringify(tnode.init.domNode.attribs['id'])}`)
    }

    return (
      <TDefaultRenderer
        {...props}
        onPress={onPress}
        style={{ color: 'red', textDecorationLine: 'none', backgroundColor: 'rgba(255, 0, 0, .1)' }} // Optional: Styling for interactivity
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
      {/* <Spoiler value={[]} props={null} /> */}
    </>
  )
}
