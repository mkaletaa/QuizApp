import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

//questionComponent is a string (if a question doesn't have any images etc.) or an object of a single question component like {"componentType": "Text", "value": "Do you have a pet?"}
const renderComponent = dataComponent => {
  const { componentType, value } = dataComponent

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

    default:
      return (
        <Text style={styles.text} key={value}>
          {dataComponent}
        </Text>
      )
  }
}

export default function ContentRenderer({ data }) {
  // if a question is text only, turn it into one element array
  const dataArray = Array.isArray(data) ? data : [data]

  return (
    <View style={styles.container}>
      {dataArray.map(component => renderComponent(component))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 100,
    // resizeMode: 'contain',
    backgroundColor: 'red',
  },
})
