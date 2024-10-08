import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

import { Colors } from '../../utils/constants'
import { Component } from '../../utils/types'
import Ad from './Ad'
import Block from './Block'
import Code from './Code'
import ImageComponent from './ImageComponent'
import { List, ListElement } from './List'
import Math from './Math'
import Paragraph from './Paragraph'
import SpoilerButton from './SpoilerButton'

//dataComponent is an object of a single component, eg. {"type": "Text", "value": "Do you have a pet?"}
export const renderComponent = (dataComponent: Component, width: number) => {
  const { type: componentType, props, value } = dataComponent
  //key is stringified object itself (20 first characters)
  let key: string
  if (value) key = JSON.stringify(value).slice(0, 50)

  switch (componentType) {
    case 'Text':
      return <Paragraph value={value} width={width} key={key} props={props} />
    case 'CText':
      return (
        <Paragraph
          value={value}
          width={width}
          key={key}
          props={{ center: true }}
        />
      )

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
          }}
        >
          <Text
            style={{
              fontSize: setFontSize(),
              fontWeight: 'bold',
              color: Colors.boldText,
            }}
          >
            {value}
          </Text>
        </View>
      )

    case 'List': //! deprecated
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

    case 'Quote': //? Maybe make a Block type of quote
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
          width={width}
          description={props?.description || null}
          value={value}
        />
      )
    case 'Math':
      return <Math width={width} value={value} props={props} />

    case 'Spoiler':
      return <SpoilerButton value={value} props={props} />

    case 'Code':
      // const codeContainerStyle = {
      //   // ...styles.codeContainer,
      //   ...props,
      // }
      return <Code width={width} props={props} value={value} />
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

    case 'Ad':
      return <Ad width={width} />

    case 'Comment':
      return null

    default: //same as CText
      return (
        <Paragraph
          value={dataComponent}
          width={width}
          key={key}
          props={{ center: true }}
        />
      )
  }
}

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
    : [{ type: 'Text', value: content, props: { center: true } }]

  if (!width) width = Dimensions.get('window').width

  //TODO: dodać index jako key
  return (
    <View style={styles.container}>
      {contentArray.map((component, index) =>
        renderComponent(component, width),
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  code: {
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
