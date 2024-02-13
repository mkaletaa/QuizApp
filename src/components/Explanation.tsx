import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
const renderComponent = questionComponent => {
  const { componentType, value } = questionComponent
  console.log('🚀 ~ renderComponent ~ data:', questionComponent)
  console.log('🚀 ~ renderComponent ~ componentType:', componentType)
  // console.log("🚀 ~ renderComponent ~ props:", props)
  console.log('🚀 ~ renderComponent ~ value:', value)

  switch (componentType) {
    case 'Text':
      return (
        //<View key={value}>
        <Text key={value}>{value}</Text>
        //</View>
      )

    case 'Image':
      return (
        // include at least width and height!
        <Image
          key={value}
          style={{
            width: 51,
            height: 51,
            // resizeMode: 'contain',
          }}
          source={{
            uri: value,
          }}
        />
      )

    default:
      return <Text>{questionComponent}</Text>
  }
}

export default function Explanation({ explanation }) {
  // if a question is text only, turn it into one element array
  const explanationData = Array.isArray(explanation) ? explanation : [explanation]

  //if a question consists of not only text but also eg. an image, each of the componnts is rendered separately
  return (
    <View>
      {explanationData.map(questionComponent =>
        renderComponent(questionComponent)
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
