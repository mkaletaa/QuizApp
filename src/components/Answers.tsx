import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const option = data => {
  const { componentType, props, answer } = data
//   console.log('🚀 ~ renderComponent ~ data:', componentType, props)
  // Obsługuj różne rodzaje komponentów
  switch (componentType) {
    //Text, Image, MathView, CodeView, BoldText, ItalicText,

    case 'Text':
      return (
        <Text {...props}>
          {answer} dddg
        </Text>
      )

    default:
      return (
        <Text {...props}>
          {answer}
        </Text>
      )
  }
}

export default function Answers({ answers }) {
  return (
    <View>
      {answers.map(answer => (
        <View key={answer.id} style={styles.answerContainer}>
          {option(answer)}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    marginTop: 10,
  },
})
