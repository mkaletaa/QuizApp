import { useNavigation } from '@react-navigation/native'
import   useQuizData from './useQuizData'
import { useState } from 'react'

const useOpenQuiz = () => {
  const navigation = useNavigation()
  const { countItemsInTopics } = useQuizData()
  const [noQuestion, setNoQuestions] = useState(false)
  //tutaj trzeba użyć zustand to otwierania modala
  
  const openQuiz = (
    topicName: string,
    chapterName: string,
    howManyItems?: number,
    shuffle: boolean = false,
    itemsArray?: string[] //nie wiem czy nie trzeba Item[]
  ): void => {
    try {
      //@ts-ignore
      navigation.navigate('Quiz', {
        topName: topicName,
        chapName: chapterName,
        howManyItems:
          howManyItems === Infinity
            ? Infinity
            : countItemsInTopics(topicName, chapterName),
        shuffle,
        itemsArray,
      })
    } catch (e) {
      console.warn(e)
    }
  }

  return openQuiz
}

export default useOpenQuiz
