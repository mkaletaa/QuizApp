import { useNavigation } from '@react-navigation/native'
import useQuizData from '../utils/useQuizData'
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
      // for (let i = 0; i < 8000000; i++) {}
      //@ts-ignore
      navigation.navigate('Quiz', {
        topName: topicName,
        chapName: chapterName,
        howManyItems: howManyItems,// === Infinity ? Infinity :  countItemsInTopics(topicName, chapterName),//todo: przenieść liczenie itemów do Quizu lub useNextQuestion żeby nie trzeba było czekać z przjeściem po dotknięciu Card
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
