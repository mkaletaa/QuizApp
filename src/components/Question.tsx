import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ContentRenderer from './ContentRenderer'

export default function Question({ question }) {
  // if a question is text only, turn it into one element array
   const questionData = Array.isArray(question) ? question : [question]

    //if a question consists of not only text but also eg. an image, each of the componnts is rendered separately
   return (
     <View>
       {questionData.map(questionComponent => (
         <ContentRenderer data={questionComponent}></ContentRenderer>
       ))}
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
