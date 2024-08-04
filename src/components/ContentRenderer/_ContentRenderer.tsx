import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native'
import CodeHighlighter from 'react-native-code-highlighter'

import YoutubePlayer from 'react-native-youtube-iframe'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { boldTextColor } from '../../utils/constants'
import { Component } from '../../utils/types'
import Block from './Block'
import ImageComponent from './ImageComponent'
import { List, ListElement } from './List'
import Math from './Math'
import Paragraph from './Paragraph'
import Spoiler from './Spoiler'

//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
export const renderComponent = (dataComponent: Component, width: number) => {
  const { type: componentType, props, value } = dataComponent
  // console.log("🚀 ~ renderComponent ~ dataComponent:", JSON.stringify(dataComponent))

  //key is stringified object itself (20 first characters)
  let key: string
  if (value) key = JSON.stringify(value).slice(0, 50)

  // console.log('🚀 ~ key:', key)

  switch (componentType) {
    case 'Text':
      return <Paragraph value={value} width={width} key={key} props={props} />

    case 'Header':
      function setFontSize(): number {
        const size = props?.size
        switch (size) {
          case 'lg':
            return 23
          case 'md':
            return 20
          case 'sm':
            return 17
          default:
            return 20
        }
      }
      return (
        <View
          key={key}
          style={{
            width: '100%',
            paddingTop: 10,
            // backgroundColor: 'lightblue',
          }}
        >
          <Text
            style={{
              fontSize: setFontSize(),
              fontWeight: 'bold',
              color: boldTextColor,
            }}
          >
            {value}
          </Text>
        </View>
      )

    case 'List':
      return <List value={value} width={width} key={key} />

    case 'ListElement':
      return <ListElement value={value} width={width} key={key} />
    case 'BulletPoint':
      return <ListElement value={value} width={width} key={key} />

    case 'Block':
      return <Block value={value} type={props.type} key={key} />

    case 'Divider':
      return (
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'black',
            opacity: 0.2,
          }}
        ></View>
      )

    case 'Quote':
      return (
        <View style={styles.quote} key={key}>
          {
            //@ts-ignore
            value.map((item, index) => renderComponent(item, width))
          }
        </View>
      )

    case 'Image':
      return (
        <ImageComponent
          key={key}
          width={width} //tutaj już przygotować odpowiednio width
          description={props?.description || null}
          value={value}
          orientation={props?.orientation}
        />
      )
    case 'Math': //tutaj już przygotować odpowiednio width
      return <Math width={width} value={value} props={props} />

    case 'Spoiler':
      return <Spoiler value={value} props={props} />

    case 'Code':
      const codeContainerStyle = {
        // ...styles.codeContainer,
        ...props,
      }
      return (
        // <ScrollView horizontal={true} contentContainerStyle={{overflow: 'auto', elevation: 10, backgroundColor: 'transparent', width: 320}}>
        <View
          key={key}
          style={{ width: width * 0.93, paddingBottom: 0 }} //można jeszcze określić maxWidth dla większych ekranów
          // horizontal
        >
          <CodeHighlighter
            hljsStyle={nightOwl}
            textStyle={{ fontSize: 16 }}
            language={props.language}
            //@ts-ignore
            customStyle={styles.code}
            containerStyle={{ paddingVertical: 10 }} //used to be width 100%
          >
            {value}
          </CodeHighlighter>
        </View>
        // </ScrollView>
      )
    case 'YouTube':
      const screenWidth = Dimensions.get('window').width
      return (
        <YoutubePlayer
          key={key}
          height={(width * 0.9 * 9) / 16}
          width={width * 0.9}
          play={false}
          videoId={value}
          onChangeState={() => {}}
        />
      )
  }
}

//tutaj trafia question, explanation i theory
export default function ContentRenderer({
  content,
  width,
}: {
  content: string | Component[]
  width?: number
}) {
  // if a question is text only, turn it into one element array
  const contentArray: Component[] = Array.isArray(content)
    ? content
    : [{ type: 'Text', value: content }]

  if (!width) width = Dimensions.get('window').width

  //TODO: dodać index jako key
  return (
    <View style={styles.container}>
      {contentArray.map((component, index) =>
        renderComponent(component, width)
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    width: '100%', //TODO: zmienić albo i nie
  },

  code: {
    // paddingVertical: 6,
    // paddingLeft: 12,
    overflow: 'hidden',
    borderRadius: 7,
    backgroundColor: '#111133',
    elevation: 10,
  },
  quote: {
    borderRadius: 3,
    backgroundColor: '#FFF5B5',
    borderLeftWidth: 3,
    borderColor: '#CBA724',
    padding: 5,
  },
})
