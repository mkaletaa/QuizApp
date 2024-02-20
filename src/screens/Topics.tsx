import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { topics } from '../../data/data'
import Card from '../components/Card'
import ModalComponent from '../components/ModalComponent'
import useQuizData from '../hooks/useQuizData'
import utilStyles from '../utils/styles'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  // const [howManyItems, setHowManyItems] = useState<number | null>(null)
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics plus __All__
  const [showModal, setShowModal] = useState(false)
  const [chosenTopics, setChosenTopics] = useState([]) //topics that user want to take a quiz
  const { countItems } = useQuizData()
  const navigation = useNavigation()

  useEffect(() => {
    //Here a dummy topic is added
    const categoryName: string = route.params.categoryName
    const categoryDescription: string = route.params.categoryDescription
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      let name: string = categoryName + '__All__'
      setTopicsToShow([
        { name, image: 'https://reactjs.org/logo-og.png' },
        ...topics[categoryName],
      ])
    }
    console.log('🚀 ~ useEffect ~ topics:', [...topics[categoryName]])
  }, [route.params])

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (showModal) {
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
  }, [showModal])

  const showTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (
    topicsArray: string[],
    categoryName: string,
    howManyItems: number | null = null
  ): void => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (topicsArray[0].endsWith('__All__')) {
      setShowModal(true)
      return
    }

    //@ts-ignore
    navigation.navigate('Quiz', {
      topArray: topicsArray,
      categoryName,
      howManyItems,
    })
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
    <View>
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        {topicsToShow.map(topic => (
          <Card
            catOrTop={'top'}
            key={topic.name}
            data={topic}
            showQuiz={() => showQuiz([topic.name], categoryName)}
            showTheory={() => showTheory(topic.name, categoryName)}
          ></Card>
        ))}
      </ScrollView>

      <ModalComponent
        modalVisible={showModal}
        setModalVisible={setShowModal}
        dataToIterate={topics[categoryName]}
        toggleTopic={toggleTopic}
        showQuiz={() => showQuiz(chosenTopics, categoryName)}
      />
    </View>
  )
}
