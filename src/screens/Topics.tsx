import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { topics } from '../../data/data'
import Card from '../components/Card'
import Stats from '../components/Stats'
import RandomQuestion from '../components/ui/RandomQuestion'
import useQuizData from '../hooks/useQuizData'
import utilStyles from '../utils/styles'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  // const [howManyItems, setHowManyItems] = useState<number | null>(null)
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics plus __All__
  const navigation = useNavigation()
  const [showStats, setShowStats] = useState(false)

  const { countItemsInTopics } = useQuizData()

  useEffect(() => {
    //Here a dummy topic is added
    const categoryName: string = route.params.categoryName
    const categoryDescription: string = route.params.categoryDescription
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      // let name: string = categoryName + '__All__'
      setTopicsToShow([...topics[categoryName]])
    }
    console.log('🚀 ~ useEffect ~ topics:', [...topics[categoryName]])
  }, [route.params])

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
    //* można tez zrobić że tutaj się pobierają pytania, i przekazywane w formie topArray
    //@ts-ignore
    navigation.navigate('Quiz', {
      topName: topicName,
      catName: categoryName,
      howManyItems: countItemsInTopics(topicName, categoryName),
      shuffle: true,
    })

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
      <RandomQuestion catName={categoryName} />
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
