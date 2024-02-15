import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { topics } from '../../data/data'
import ModalComponent from '../components/ModalComponent'
import useImportQuiz from '../hooks/useImportQuiz'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics with one dummy topic at the beginning representing __All__
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenTopics, setChosenTopics] = useState([]) //topics that user want to take a quiz
  const importQuiz = useImportQuiz()
  const navigation = useNavigation()

  useEffect(() => {
    //Here a dummy topic is added
    const { categoryName } = route.params || {}
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      let name: string = categoryName + '__All__'
      setTopicsToShow([{ name, pic: '', des: '' }, ...topics[categoryName]])
    }
  }, [route.params])

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (modalVisible) {
      const updatedChosenTopics = []

      Object.keys(topics).forEach(category => {
        topics[category].forEach(topic => {
          if (category === categoryName) {
            updatedChosenTopics.push(topic.name)
          }
        })
      })

      setChosenTopics(updatedChosenTopics)
    } else {
      setChosenTopics([])
    }
  }, [modalVisible])

  const showTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (topicsArray: Array<string>, categoryName) => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (topicsArray[0].endsWith('__All__')) {
      setModalVisible(true)
      return
    }
    console.log(topicsArray)
    
    // if (topicsArray.length > 2) {
    //   setModalVisible(true)
    //   return
    // }

    importQuiz(topicsArray, categoryName, topics)
  }

  function toggleTopic(name: string, isChosen: boolean): void {
    setChosenTopics(prevChosenTopics => {
      if (!isChosen) {
        // Dodaj name do tablicy, jeśli isChosen jest true
        return prevChosenTopics.concat(name)
      } else {
        // Usuń name z tablicy, jeśli isChosen jest false
        return prevChosenTopics.filter(topic => topic !== name)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text>List of all topics for {categoryName}:</Text>
      <StatusBar style="auto" />
      
      {topicsToShow.map(topic => (
        <View key={topic.name}>
          <Text>{topic.des}</Text>
          <Button
            title={topic.name}
            onPress={() => showQuiz([topic.name], categoryName)}
          />
          {!topic.name.endsWith('__All__') ? (
            <Button
              title="read about"
              onPress={() => showTheory(topic.name, categoryName)}
            />
          ) : null}
        </View>
      ))}

      {/* <Modal
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
              showQuiz(chosenTopics, categoryName)
            }}
          />
        </View>
      </Modal> */}

      <ModalComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataToIterate={topics[categoryName]}
        toggleTopic={toggleTopic}
        showQuiz={()=>showQuiz(chosenTopics, categoryName)}
      />
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
