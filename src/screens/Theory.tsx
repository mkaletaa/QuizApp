import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { topics } from '../../data/data'
import { top_1 } from '../../data/data'
import { top_2 } from '../../data/data'
import t from '../../data/top_1.json'
import { theories } from '../../data/data'

const renderComponent = data => {
  const { componentType, props } = data

  // Obsługuj różne rodzaje komponentów
  switch (componentType) {
    case 'View':
      return (
        <View key={componentType} {...props}>
          {props.children.map(renderComponent)}
        </View>
      )
    case 'Text':
      return (
        <Text key={componentType} {...props}>
          {props.children}
        </Text>
      )
    default:
      return null
  }
}

export default function Theory({ route }) {
  const [topicName, setTopicName] = useState('')
  const [theory, setTheory] = useState({})

  useEffect(() => {
    setTopicName(route.params.topicName)

    for (const topic of theories) {
      if (topic.name === route.params.topicName) {
        setTheory(topic)
        break
      }
    }

    // switch(route.params.topicName){
    //     case 'top_1': setTheory(top_1); break;
    //     case 'top_2': setTheory(top_2); break;
    // }
  }, [route.params])

  return (
    <View style={styles.container}>
      <Text>theory for {topicName}:</Text>
      <StatusBar style="auto" />

      <View>
        <Text>this is the theory of {topicName}</Text>
        {renderComponent(theory)}
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
