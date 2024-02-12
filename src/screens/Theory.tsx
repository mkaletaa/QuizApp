import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theory } from '../../data/theory/theory'

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
  const [topicTheory, setTopicTheory] = useState({})

  useEffect(() => {
    setTopicName(route.params.topicName)

    // for (const topic of theories) {
    //   if (topic.name === route.params.topicName) {
    //     console.log("🚀 ~ useEffect ~ topic:", topic)
    //     setTheory(topic)
    //     break
    //   }
    // }

    console.log('ttt', JSON.stringify(theory))

    for (const cat in theory) {
      //ietrate through categories (main keys) in theory
      if (theory.hasOwnProperty(cat)) {
        if (cat !== route.params.categoryName) { //check the name of the main key
          console.log('🚀 ~ useEffect ~ cat:', cat)
          continue //skip if not the correct category
        }
        const value = theory[cat]
        for (const top in value) {
          //iterate through topics in correct category
          console.log(value[top].name)
          if (value[top].name === route.params.topicName) {
            setTopicTheory(value[top])
            console.log(`Key: ${cat}, Value: ${value[top]}`)
            break
          }
        }
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
        {renderComponent(topicTheory)}
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
