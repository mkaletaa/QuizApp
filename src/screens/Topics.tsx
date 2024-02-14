import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import { topics } from '../../data/data'
import QuizModalSwitch from '../components/QuizModalSwitch'
import useImportQuiz from '../hooks/useImportQuiz'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  const [currentTopics, setCurrentTopics] = useState([]) //all topics with one dummy topic at the beginning representing __All__
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenTopics, setChosenTopics] = useState(new Map())
  const importQuiz = useImportQuiz()

  // Ustawienie domyślnej wartości na mapę
  useEffect(() => {
    const defaultChosenTopics = new Map()

    if (categoryName !== '' && topics[categoryName]?.length > 0) {
      for (let i = 0; i < topics[categoryName]?.length; i++) {
        const topic = topics[categoryName][i]
        //  console.log('🚀 ~ forEach ~ topicName:', topic.name)
        defaultChosenTopics.set(topic.name, true)
      }
    }

    setChosenTopics(defaultChosenTopics)
    //  console.log('🚀 ~ useEffect ~ topics:', defaultChosenTopics)
  }, [categoryName, topics])

  const navigation = useNavigation()

  useEffect(() => {
    const { categoryName } = route.params || {}
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      let name: string = categoryName + '__All__'
      setCurrentTopics([{ name, pic: '', des: '' }, ...topics[categoryName]])
    }
  }, [route.params])

  const pressTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  function convertToArray(
    topicName: string | Map<string, boolean>,
    categoryName: string
  ) {
    let topicList = [] //this array stores a list of topics that need to be imported
    //zamień topicName na tablicę, jeśli jest mapą. Do tablicy mają być wkładane tylko te klucze, które mają wartośc true

    // Sprawdź typ topicName i odpowiednio przekształć go na tablicę
    if (typeof topicName === 'string') {
      // Jeśli topicName jest stringiem, dodaj go do listy
      topicList.push(topicName)
    } else if (topicName instanceof Map) {
      // Jeśli topicName jest mapą, dodaj klucze o wartości true do listy
      topicName.forEach((value, key) => {
        if (value) {
          topicList.push(key)
        }
      })
    } else if (Array.isArray(topicName)) {
      // Jeśli topicName jest tablicą, dodaj jej elementy do listy
      topicList = topicList.concat(topicName)
    }

    importQuiz(topicList, categoryName, topics)
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const pressQuiz = (
    topicName: string | Map<string, boolean>,
    categoryName
  ) => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (typeof topicName === 'string' && topicName.endsWith('__All__')) {
      setModalVisible(true)
      return
    }

    convertToArray(topicName, categoryName)
  }

  function toggleTopic(name: string, isChosen: boolean): void {
    setChosenTopics(
      prevChosenTopics => new Map(prevChosenTopics.set(name, !isChosen))
    )
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
            onPress={() => pressQuiz(topic.name, categoryName)}
          />
          {!topic.name.endsWith('__All__') ? (
            <Button
              title="read about"
              onPress={() => pressTheory(topic.name, categoryName)}
            />
          ) : null}
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {topics[categoryName] &&
            topics[categoryName].map(topic => (
              <QuizModalSwitch topic={topic} toggleTopic={toggleTopic} />
            ))}

          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
          <Button
            title="Start the quiz"
            onPress={() => {
              setModalVisible(false)
              pressQuiz(chosenTopics, categoryName)
            }}
          />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
})
