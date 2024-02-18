import React, { useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Component } from '../utils/types'
import MathJax from 'react-native-mathjax'
import CodeHighlighter from 'react-native-code-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'

//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
const renderComponent = (dataComponent: Component) => {
  const { componentType, props, value } = dataComponent

  switch (componentType) {
    case 'Text':
      return (
        <Text key={value} style={styles.text}>
          {value}
        </Text>
      )

    case 'Image':
      return (
        <Image
          key={value}
          style={styles.image}
          source={{
            uri: value,
          }}
        />
      )
    case 'Math':
      return (
        <Pressable>
          {/* to prevent the menu showing up, wrap MathJax with Pressable */}
          <MathJax
            style={{
              backgroundColor: 'transparent',
              // color: 'red',
              width: 360,
            }} //TODO: change 360 to screen width
            html={value}
            size={props?.fontSize? props.fontSize : 18}
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
          style={{  width: '90%'}} //można jeszcze określić maxWidth dla większych ekranów
        >

              <CodeHighlighter
                hljsStyle={atomOneDarkReasonable}
                textStyle={{ fontSize: 16 }}
                language="typescript"
                //@ts-ignore
                customStyle={{  padding: 6, borderRadius: 7 , backgroundColor: 'dimgrey', elevation: 10}}
                containerStyle={styles.codeContainer}
              >
                {value}
              </CodeHighlighter>

        </View>
      )
    // default:
    //   return (
    //     <Text style={styles.text} key={value}>
    //       {dataComponent}
    //     </Text>
    //   )
  }
}

//tutaj trafia question, explanation i theory
export default function ContentRenderer({ content }) {

  // if a question is text only, turn it into one element array
  const contentArray = Array.isArray(content)
    ? content
    : [{ componentType: 'Text', value: content }]

  return (
    <View style={styles.container}>
      {contentArray.map(component => renderComponent(component))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10
    // backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 100,
    // resizeMode: 'contain',
    backgroundColor: 'red',
    // marginTop: 10
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
})
