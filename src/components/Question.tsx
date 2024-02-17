import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import ContentRenderer from './ContentRenderer'
import { Component } from '../utils/types'

export default function Question({ question }: {question: string | Array<Component>}) {
  // if a question is text only, turn it into one element array
  const questionData = Array.isArray(question) ? question : [question]

  //if a question consists of not only text but also eg. an image, each of the componnts is rendered separately
  return (
    <View style={styles.container}>
      {/* {questionData.map(questionComponent => (
        <ContentRenderer data={questionComponent}></ContentRenderer>
        ))} */}

        <ContentRenderer content={question}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // backgroundColor: 'lightgray',
  },
})
