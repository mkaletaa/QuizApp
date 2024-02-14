import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { categories, topics } from '../../data/data'
import QuizModalSwitch from '../components/QuizModalSwitch'
import useImportQuiz from '../hooks/useImportQuiz'

export default function Categories() {
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenCategories, setChosenCategories] = useState([]) //topics that user want to take a quiz
  const importQuiz = useImportQuiz()
  const navigation = useNavigation()
  useEffect(() => {
    console.log('🚀 ~ Categories ~ chosenCategories:', chosenCategories)
  }, [chosenCategories])

  useEffect(() => {
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      let name: string = 'AppName' + '__All__'
      setCategoriesToShow([{ name, pic: '', des: '' }, ...categories])
    }
  }, [])

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (modalVisible) {
      const updatedChosenCats = []
      categories.map(cat => updatedChosenCats.push(cat.name))
      setChosenCategories(updatedChosenCats)
    } else {
      setChosenCategories([])
    }
  }, [modalVisible])

  const goToTopics = catName => {
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

  function toggleTopic(name: string, isChosen: boolean): void {
    setChosenCategories(prevChosenTopics => {
      if (!isChosen) {
        // Dodaj name do tablicy, jeśli isChosen jest true
        return prevChosenTopics.concat(name)
      } else {
        // Usuń name z tablicy, jeśli isChosen jest false
        return prevChosenTopics.filter(topic => topic !== name)
      }
    })
  }

  const showQuiz = (topicsArray: Array<string>) => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (topicsArray[0].endsWith('__All__')) {
      setModalVisible(true)
      return
    }

    if (topicsArray.length > 2) {
      setModalVisible(true)
      return
    }

    importQuiz(topicsArray, 'cat_1', topics)
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {categoriesToShow.map(cat => (
        <View key={cat.name}>
          <Text>{cat.des}</Text>

          {cat.name.endsWith('__All__') ? (
            <Button
              title={'all categories quiz'}
              onPress={() => showQuiz(cat.name)}
            />
          ) : (
            <Button title={cat.name} onPress={() => goToTopics(cat.name)} />
          )}
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {categories &&
            categories.map(topic => (
              <QuizModalSwitch topic={topic} toggleTopic={toggleTopic} />
            ))}

          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
          <Button
            title="Start the quiz"
            onPress={() => {
              setModalVisible(false)
              showQuiz(chosenCategories)
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
