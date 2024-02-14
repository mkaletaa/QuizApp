import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'

export default function Theory({ route }) {
  const [topicName, setTopicName] = useState('')

  useEffect(() => {
    setTopicName(route.params.topicName)
  }, [route.params])

  return (
    <View style={styles.container}>
      <Text>theory for {topicName}:</Text>
      <StatusBar style="auto" />

      <View>
        <Text>this is the theory of {topicName}</Text>
        {theory[route.params.categoryName][route.params.topicName]?.map(
          questionComponent => (
            <ContentRenderer data={questionComponent}></ContentRenderer>
          )
        )}
      </View>
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
