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
  Dimensions,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native'
import { Component } from '../utils/types'
import MathJax from 'react-native-mathjax'
import CodeHighlighter from 'react-native-code-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import YoutubePlayer from 'react-native-youtube-iframe'
import RenderHtml from 'react-native-render-html'
import { AntDesign } from '@expo/vector-icons'
//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
const renderComponent = (dataComponent: Component, width: number) => {
  // const { width } = useWindowDimensions()
  const { componentType, props, value } = dataComponent
  //ogarnąć style

  switch (componentType) {
    // case 'Text':
    //   return (
    //     <Text key={value} style={styles.text}>
    //       {value}
    //       {props && renderComponent(props)}
    //     </Text>
    //   )

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
      function setBgColor(
        type: 'info' | 'warning' | 'important' | 'task'
      ): string {
        if (type === 'info') return 'lightblue'
        else if (type === 'warning') return 'orange'
        else if (type === 'important') return 'tomato'
        else if (type === 'task') return 'green'
      }
      function setBorderColor(
        type: 'info' | 'warning' | 'important' | 'task'
      ): string {
        if (type === 'info') return 'lightblue'
        else if (type === 'warning') return 'brown'
        else if (type === 'important') return 'red'
        else if (type === 'task') return 'green'
      }
      return (
        <View
          style={{
            width: '100%',
            padding: 5,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: setBorderColor(props.type),
            backgroundColor: setBgColor(props.type),
            flexDirection: 'row',
            // flexGrow: 1,
            // gap: 5,
          }}
        >
          {
            <React.Fragment>
              <AntDesign
                name="exclamationcircleo"
                style={{
                  width: '10%',
                  backgroundColor: 'tomato',
                  justifyContent: 'center',
                  // textAlign: 'center',
                }}
                size={24}
                color="black"
              />
              <View
                style={{
                  flexWrap: 'wrap',
                  backgroundColor: 'tomato',
                  width: '90%',
                }}
              >
                {
                  //@ts-ignore
                  value.map(item => renderComponent(item, width))
                }
              </View>
            </React.Fragment>
          }
        </View>
      )

    case 'Quote':
      return (
        <View
          style={{
            // width: '100%',
            // height: 20,
            borderRadius: 3,
            backgroundColor: '#FFF5B5',
            borderLeftWidth: 3,
            borderColor: '#CBA724',
            padding: 5,
          }}
        >
          {
            //@ts-ignore
            value.map(item => renderComponent(item, width))
          }
        </View>
      )

    case 'Image':
      return (
        <React.Fragment>
          <Image
            key={value}
            style={styles.image}
            source={{
              uri: value,
            }}
          />
          {props?.description && (
            <Text style={{ opacity: 0.5, marginTop: -10 }}>
              {props.description}
            </Text>
          )}
        </React.Fragment>
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
            customStyle={{
              padding: 6,
              borderRadius: 7,
              backgroundColor: '#111133',
              //@ts-ignore
              elevation: 20,
            }}
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
          // style={{marginTop: 200}}
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
    // default:
    //   return (
    //     <Text style={styles.text}>
    //       {value}
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
