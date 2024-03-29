import { useNavigation } from '@react-navigation/native'
import useQuizData from '../utils/useQuizData'
import { useState } from 'react'
import { quiz } from '../../data/quiz/quizModule'

const useOpenQuiz = () => {
  const navigation = useNavigation()
  // const { countItemsInTopics } = useQuizData()
  const [noQuestion, setNoQuestions] = useState(false)
  //tutaj trzeba użyć zustand to otwierania modala

  const openQuiz = (
    topicName: string,
    chapterName: string,
    howManyItems?: number,
    shuffle: boolean = true,
    itemsArray?: string[] //nie wiem czy nie trzeba Item[]
  ): void => {
    // quiz[chapterName][topicName]
    //TODO: prawdopodobnie będzie trzeba z powrotem countItems dać tutaj
    
    if (howManyItems === Infinity) {
      //@ts-ignore
      navigation.navigate('Quiz', {
        topName: topicName,
        chapName: chapterName,
        howManyItems: howManyItems,
        shuffle,
        itemsArray,
      })
    } else if (quiz[chapterName][topicName] || howManyItems === Infinity)
      //@ts-ignore
      navigation.navigate('Quiz', {
        topName: topicName,
        chapName: chapterName,
        howManyItems: howManyItems,
        shuffle,
        itemsArray,
      })
    else {
      //zrób coś jeśli nie ma quizu dla tego topika
    }
  }

  return openQuiz
}

export default useOpenQuiz
