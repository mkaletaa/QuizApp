import React, { useState } from 'react'
import {
  FlatList,
  // Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
  Modal,
} from 'react-native'
import { Component } from '../utils/types'
import MathJax from 'react-native-mathjax'
import CodeHighlighter from 'react-native-code-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import YoutubePlayer from 'react-native-youtube-iframe'
import RenderHtml from 'react-native-render-html'
import ImageComponent from './ContentRenderer/ImageComponent'

import Block from './ContentRenderer/Block'
//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
export const renderComponent = (dataComponent: Component, width: number) => {
  // const { width } = useWindowDimensions()
  const { componentType, props, value } = dataComponent

  switch (componentType) {
    case 'Text':
      let modifiedValue = value.replace(
        /<p\s?/g,
        '<p style="margin-bottom: 0px;" '
      )
      return (
        <RenderHtml contentWidth={width} source={{ html: modifiedValue }} />
      )

    case 'Header':
      return (
        <Text
          style={{ fontSize: 35, fontWeight: 'bold', backgroundColor: 'red' }}
        >
          {value}
        </Text>
      )

    case 'Block':
      return <Block value={value} type={props.type} />

    case 'Quote':
      return (
        <View style={styles.quote}>
          {
            //@ts-ignore
            value.map(item => renderComponent(item, width))
          }
        </View>
      )

    case 'Image':
      return (
        <ImageComponent description={props?.description || null} value={value}/>
      )
    case 'Math':
      return (
        <Pressable>
          {/* to prevent the menu showing up, wrap MathJax with Pressable */}
          <MathJax
            style={{
              backgroundColor: 'transparent',
              width: 360,
            }} //TODO: change 360 to screen width
            html={value}
            size={props?.fontSize ? props.fontSize : 18}
          />
        </Pressable>
      )

    case 'Code':
      const codeContainerStyle = {
        ...styles.codeContainer,
        ...props,
      }
      return (
        <View
          style={{ width: '90%' }} //można jeszcze określić maxWidth dla większych ekranów
        >
          <CodeHighlighter
            hljsStyle={nightOwl}
            textStyle={{ fontSize: 16 }}
            language={props.language}
            //@ts-ignore
            customStyle={styles.code}
            containerStyle={styles.codeContainer}
          >
            {value}
          </CodeHighlighter>
        </View>
      )
    case 'YouTube':
      const screenWidth = Dimensions.get('window').width

      return (
        <YoutubePlayer
          height={(screenWidth * 0.9 * 9) / 16}
          width={screenWidth * 0.9}
          play={false}
          videoId={value}
          onChangeState={() => {}}
        />
      )
    case 'Link':
      return (
        <TouchableOpacity onPress={() => Linking.openURL(value)}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            {props.text}
          </Text>
        </TouchableOpacity>
      )
  }
}

//tutaj trafia question, explanation i theory
export default function ContentRenderer({ content }) {
  // if a question is text only, turn it into one element array
  const contentArray = Array.isArray(content)
    ? content
    : [{ componentType: 'Text', value: content }]

  const { width } = useWindowDimensions()
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
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
    // backgroundColor: 'yellow',
    width: 360, //TODO: zmienić
  },
  text: {
    fontSize: 18,
  },
  codeContainer: {
    padding: 10,
    width: '100%',
    // borderRadius: 100,
    // marginLeft: 20,
    // marginRight: 20
    // backgroundColor: 'blue',
    //minWidth: '100%',
    // height: 40,
    // maxHeight: '100%',
  },
  code: {
    padding: 6,
    borderRadius: 7,
    backgroundColor: '#111133',
    //@ts-ignore
    elevation: 20,
  },
  quote: {
    // width: '100%',
    // height: 20,
    borderRadius: 3,
    backgroundColor: '#FFF5B5',
    borderLeftWidth: 3,
    borderColor: '#CBA724',
    padding: 5,
  },
})
