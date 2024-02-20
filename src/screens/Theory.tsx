import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'
// import { A } from '@expo/html-elements'

export default function Theory({ route }) {
  const [topicName, setTopicName] = useState('')

  useEffect(() => {
    setTopicName(route.params.topicName)
  }, [route.params])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ marginTop: 20 }}>theory for {topicName}:</Text>
      <StatusBar style="auto" />

      <View style={{ marginBottom: 50 }}>
        <ContentRenderer
          content={theory[route.params.categoryName][route.params.topicName]}
        ></ContentRenderer>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
