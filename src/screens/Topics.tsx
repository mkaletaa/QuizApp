import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, View, StyleSheet } from 'react-native'
import { topics } from '../../data/data'
import Card from '../components/Card'
import Stats from '../components/Stats'
import RandomQuestion from '../components/ui/RandomQuestion'
import useQuizData from '../utils/useQuizData'
import utilStyles from '../utils/styles'
import useOpenQuiz from '../hooks/useOpenQuiz'

export default function Topics({ route }) {
  const [chapterName, setChapterName] = useState('')
  // const [howManyItems, setHowManyItems] = useState<number | null>(null)
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics plus __All__
  const navigation = useNavigation()
  const [showStats, setShowStats] = useState(false)
  const openQuiz = useOpenQuiz()

  const { countItemsInTopics } = useQuizData()

  useEffect(() => {
    //Here a dummy topic is added
    const chapterName: string = route.params.chapterName
    const chapterDescription: string = route.params.chapterDescription
    if (chapterName && topics[chapterName]) {
      setChapterName(chapterName)
      // let name: string = categoryName + '__All__'
      setTopicsToShow([...topics[chapterName]])
    }
    console.log('🚀 ~ useEffect ~ topics:', [...topics[chapterName]])
  }, [route.params])

  const showTheory = (topicName, chapterName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, chapterName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (
    topicName: string,
    chapterName: string
    // howManyItems: number | null = null
  ): void => {
    openQuiz(topicName, chapterName)
    // //* można tez zrobić że tutaj się pobierają pytania, i przekazywane w formie topArray lub przez zustand
    // //@ts-ignore
    // navigation.navigate('Quiz', {
    //   topName: topicName,
    //   chapName: chapterName,
    //   howManyItems: countItemsInTopics(topicName, chapterName),
    //   shuffle: false,
    // })

    // setHowManyItems(null)
  }

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
      <RandomQuestion chapName={chapterName} />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        {topicsToShow.map(topic => (
          <Card
            chapOrTop={'top'}
            key={topic.name}
            data={topic}
            onCardPress={() => showQuiz(topic.name, chapterName)}
            showTheory={() => showTheory(topic.name, chapterName)}
            onCardLongPress={() => handleLongPress(topic.name)}
          ></Card>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showStats}
        onRequestClose={() => setShowStats(false)}
      >
        <Stats
          key_={pressedTopic}
          onClose={() => setShowStats(false)}
          chapOrTop={'top'}
        />
      </Modal>
    </View>
  )
}
