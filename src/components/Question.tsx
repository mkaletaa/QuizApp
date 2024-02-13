import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const renderComponent = data => {
  const { componentType, props } = data
  console.log('🚀 ~ renderComponent ~ data:', data)
  // Obsługuj różne rodzaje komponentów
  switch (componentType) {
    //Text, Image, MathView, CodeView, BoldText, ItalicText,

    case 'Text':
      return (
        <Text key={componentType} {...props}>
          {data.value}
        </Text>
      )

    default:
      return (
        <Text key={componentType} {...props}>
          {data}
        </Text>
      )
  }
}

export default function Question({ prop }) {
  return <View>{renderComponent(prop)}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
