import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import { topics } from '../../data/data'
import { quiz } from '../../data/quiz/quiz'
import { quiz as quiz2 } from '../../data/quiz/quiz2'
import QuizModalSwitch from '../components/QuizModalSwitch'
import useImportQuiz from '../hooks/useImportQuiz'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  const [currentTopics, setCurrentTopics] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenTopics, setChosenTopics] = useState(new Map())
  const importQuiz = useImportQuiz()
  
  // Ustawienie domyślnej wartości na mapę
  useEffect(() => {
    const defaultChosenTopics = new Map()
    Object.keys(topics).forEach(topicName => {
      defaultChosenTopics.set(topicName, true)
    })
    setChosenTopics(defaultChosenTopics)
  }, [])

  const navigation = useNavigation()

  useEffect(() => {
    const { categoryName } = route.params || {}
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      setCurrentTopics([
        { name: 'cat_1__All__', pic: '', des: '' },
        ...topics[categoryName],
      ])
    }
  }, [route.params])

  const onPressTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  const onPressQuiz = (topicName, categoryName) => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal
    //TODO: pobierz pytania i je prześlij do Quiz przez route
    if (topicName.endsWith('__All__')) {
      setModalVisible(true)
      return
    }

    importQuiz(topicName)
  }

  

  function toggleTopic(name: string, isChosen: boolean): void {
    setChosenTopics(
      prevChosenTopics => new Map(prevChosenTopics.set(name, isChosen))
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
            onPress={() => onPressQuiz(topic.name, categoryName)}
          />
          {!topic.name.endsWith('__All__') ? (
            <Button
              title="read about"
              onPress={() => onPressTheory(topic.name, categoryName)}
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
              setModalVisible(false), onPressQuiz('all', categoryName)
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
