import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { theory } from '../../data/theory/theory'
import ContentRenderer from '../components/ContentRenderer'
// import { A } from '@expo/html-elements'
import { useNavigation } from '@react-navigation/native'

export default function Theory({ route }) {
  const [topicName, setTopicName] = useState('')
  const navigation = useNavigation()

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
      <Button
        title="report a mistake"
        color="red"
        onPress={() => {
          //@ts-ignore
          navigation.navigate('Report', {itemOrTheory:'theory'})
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
