import { Entypo } from '@expo/vector-icons'
import React from 'react'
import {
  Dimensions,
  // Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import CodeHighlighter from 'react-native-code-highlighter'
import MathJax from 'react-native-mathjax'
import RenderHtml from 'react-native-render-html'
import YoutubePlayer from 'react-native-youtube-iframe'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Component } from '../utils/types'
import Block from './ContentRenderer/Block'
import ImageComponent from './ContentRenderer/ImageComponent'

//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
export const renderComponent = (dataComponent: Component, width: number) => {
  // console.log('🚀 ~ dataComponent:', JSON.stringify(dataComponent))
  // console.log('🚀 ~ index:', index)
  // const { width } = useWindowDimensions()

  const { componentType, props, value } = dataComponent
  // const key = uuidv4()

  //key is stringified object itself (20 first characters)
  const key: string = JSON.stringify(value).slice(0, 20)

  console.log('🚀 ~ key:', key)

  switch (componentType) {
    case 'Text':
      // let modifiedValue = value.replace(
      //   /<p>\s?/g,
      //   '<p style="margin-bottom: 0px;  font-size: 18px" >&nbsp;&nbsp;&nbsp;&nbsp;'
      // )
      let modifiedValue = '<span style=" font-size: 18px">' + value + '</span>'
      // modifiedValue = modifiedValue.replace(
      //   /<p>\s?/g,
      //   '<p style="margin-bottom: 0px; background-color: red" >&nbsp;&nbsp;&nbsp;&nbsp;'
      // )
      return (
        // <View
        //   style={{
        //     // backgroundColor: 'yellow',
        //     width: '100%', maxWidth: 300,
        //     alignItems: 'center'
        //   }}
        // >
        <RenderHtml
          key={key}
          contentWidth={width}
          source={{ html: modifiedValue }}
        />
        // {/* </View> */}
      )

    case 'Header':
      return (
        <View
          style={{
            width: '100%',
            paddingBottom: 10,
            // backgroundColor: 'lightblue',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value}</Text>
        </View>
      )

    case 'List':
      // console.warn(value)
      return (
        <React.Fragment>
          <View
            style={{
              // backgroundColor: 'lightblue',
              maxWidth: '100%',
              gap: 5,
              //
            }}
          >
            {
              //@ts-ignore
              value.map((item, index) => renderComponent(item, width))
            }
          </View>
        </React.Fragment>
      )

    case 'ListElement':
      // console.warn(value)
      let modifiedValue2 =
        '<span style="margin-bottom: 0px;  font-size: 18px">' +
        value +
        '</span>'

      return (
        <View
          style={{
            flexDirection: 'row',
            width: '85%',
            // backgroundColor: 'blue',
          }}
        >
          <View
            style={{
              width: '10%',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}
          >
            <Entypo name="dot-single" size={26} color="black" />
          </View>
          <RenderHtml
            key={key}
            contentWidth={width}
            source={{ html: modifiedValue2 }}
          />
        </View>
      )

    case 'Block':
      return <Block value={value} type={props.type} key={key} />

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
          description={props?.description || null}
          value={value}
        />
      )
    case 'Math':
      return (
        <Pressable key={key}>
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
          key={key}
          style={{ width: '90%', paddingBottom: 10 }} //można jeszcze określić maxWidth dla większych ekranów
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
          key={key}
          height={(screenWidth * 0.9 * 9) / 16}
          width={screenWidth * 0.9}
          play={false}
          videoId={value}
          onChangeState={() => {}}
        />
      )
    // case 'Link':
    //   return (
    //     <TouchableOpacity onPress={() => Linking.openURL(value)} key={key}>
    //       <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
    //         {props.text}
    //       </Text>
    //     </TouchableOpacity>
    //   )
  }
}

//tutaj trafia question, explanation i theory
export default function ContentRenderer({
  content,
}: {
  content: string | Component[]
}) {
  // if a question is text only, turn it into one element array
  const contentArray: Component[] = Array.isArray(content)
    ? content
    : [{ componentType: 'Text', value: content }]

  // console.log('🚀 ~ ContentRenderer ~ contentArray:', JSON.stringify(contentArray))
  // console.log('🚀 ~ ContentRenderer ~ contentArray Length:', contentArray.length)
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

    gap: 10,
    // backgroundColor: 'yellow',
    width: '100%', //TODO: zmienić albo i nie
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
    elevation: 10,
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
