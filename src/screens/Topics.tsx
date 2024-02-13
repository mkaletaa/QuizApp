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
    if (topicName.endsWith('__All__')) {
      setModalVisible(true)
      return
    }

    importQuiz(topicName, categoryName, topics)
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
              setModalVisible(false)
              importQuiz(chosenTopics, categoryName, topics)
              console.log("🚀 ~ Topics ~ chosenTopics:", chosenTopics)
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
