import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, View, Text } from 'react-native'
import { topics } from '../../data/data'
import Card from '../components/Card'
// import ModalComponent from '../components/ModalComponent'
import useQuizData from '../hooks/useQuizData'
import utilStyles from '../utils/styles'
import Stats from '../components/Stats'
import RandomQuestion from '../components/ui/RandomQuestion'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  // const [howManyItems, setHowManyItems] = useState<number | null>(null)
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics plus __All__
  // const [showModal, setShowModal] = useState(false)
  // const [chosenTopics, setChosenTopics] = useState([]) //topics that user want to take a quiz
  // const { countItemsInTopic } = useQuizData()
  // const [howManyItems, setHowManyItems] = useState<number | null>(null)
  const navigation = useNavigation()
  const [showStats, setShowStats] = useState(false)

  const {
    importItem,
    // countItemsInCategories,
    countItemsInTopics,
    importRandomItem,
    countTopics,
    getTopicsForCategory,
  } = useQuizData()

  useEffect(() => {
    //Here a dummy topic is added
    const categoryName: string = route.params.categoryName
    const categoryDescription: string = route.params.categoryDescription
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      // let name: string = categoryName + '__All__'
      setTopicsToShow([
        ...topics[categoryName],
      ])
    }
    console.log('🚀 ~ useEffect ~ topics:', [...topics[categoryName]])
  }, [route.params])

  // useEffect(() => {
  //   // Set all values of chosenTopics after closing and opening the modal to avoid bugs
  //   if (showModal) {
  //     const updatedChosenTopics = []

  //     Object.keys(topics).forEach(category => {
  //       topics[category].forEach(topic => {
  //         if (category === categoryName) {
  //           updatedChosenTopics.push(topic.name)
  //         }
  //       })
  //     })

  //     setChosenTopics(updatedChosenTopics)
  //   } else {
  //     setChosenTopics([])
  //   }
  // }, [showModal])

  const showTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (
    topicName: string,
    categoryName: string
    // howManyItems: number | null = null
  ): void => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    // if (topicsArray[0].endsWith('__All__')) {
    //   setShowModal(true)
    //   return
    // }

    // let nrOfItems = howManyItems
    // let shuffle: boolean = true

    // if (nrOfItems === null) {
      // nrOfItems = countItemsInTopics(topicsArray, categoryName)
    //   shuffle = false // sprawdź w ustawieniach
    // } else if (nrOfItems === 0) {
    //   nrOfItems = Infinity
    //   shuffle = true
    // }

    //@ts-ignore
    navigation.navigate('Quiz', {
      topArray: [topicName],
      catName: categoryName,
      howManyItems: countItemsInTopics([topicName], categoryName),
      shuffle: false,
    })

    // setHowManyItems(null)
  }

  // function toggleTopic(name: string, isChosen: boolean): void {
  //   console.log('toggle', name)
  //   setChosenTopics(prevChosenTopics => {
  //     if (!isChosen) {
  //       // Dodaj name do tablicy, jeśli isChosen jest true
  //       return prevChosenTopics.concat(name)
  //     } else {
  //       // Usuń name z tablicy, jeśli isChosen jest false
  //       return prevChosenTopics.filter(topic => topic !== name)
  //     }
  //   })
  // }

  // function sliderHandle(value: number): void {
  //   setHowManyItems(value)
  //   console.log(value)
  // }

  const [pressedTopic, setPressedTopic] = useState<string>()
  function handleLongPress(pressedTopicName: string) {
    console.log('🚀 ~ handleLongPress ~ pressedTopicName:', pressedTopicName)
    setPressedTopic(pressedTopicName)
    setShowStats(true)
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <RandomQuestion />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        {topicsToShow.map(topic => (
          <Card
            catOrTop={'top'}
            key={topic.name}
            data={topic}
            onCardPress={() => showQuiz(topic.name, categoryName)}
            showTheory={() => showTheory(topic.name, categoryName)}
            onCardLongPress={() => handleLongPress(topic.name)}
          ></Card>
        ))}
      </ScrollView>

      {showStats && (
        <Stats
          key_={pressedTopic}
          onClose={() => setShowStats(false)}
          catOrTop={'top'}
        />
      )}


    </View>
  )
}
