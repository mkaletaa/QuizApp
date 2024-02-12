import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { topics } from '../../data/data'
import { useNavigation } from '@react-navigation/native'


export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  const [currentTopics, setCurrentTopics] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const { categoryName } = route.params || {}
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      setCurrentTopics(topics[categoryName])
    }
  }, [route.params])

  const onPressTheory = (topicName, categoryName )=> {
    //@ts-ignore
    navigation.navigate('Theory', {topicName, categoryName})
  }

  return (
    <View style={styles.container}>
      <Text>List of all topics for {categoryName}:</Text>
      <StatusBar style="auto" />
      {currentTopics.map(topic => (
        <View key={topic.name}>
          <Text>{topic.des}</Text>
          <Button
            title={topic.name}
            //   onPress={() => onPressButton(folderName)}
          />
          <Button
            title="read about"
            onPress={() => onPressTheory(topic.name, categoryName)}
          />
        </View>
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
