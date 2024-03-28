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

      
      // countItemsInTopic(route.params.topName, route.params.chapName)

    console.log("🚀 ~ useOpenQuiz ~ quiz[chapterName]:", quiz[chapterName])
    try {
      if (quiz[chapterName] && howManyItems === Infinity) {
        console.log('first')
        //@ts-ignore
        navigation.navigate('Quiz', {
          topName: topicName,
          chapName: chapterName,
          howManyItems: howManyItems,
          shuffle,
          itemsArray,
        })
      } else if (quiz[chapterName][topicName] || howManyItems === Infinity) {
        console.log('second')
        //@ts-ignore
        navigation.navigate('Quiz', {
          topName: topicName,
          chapName: chapterName,
          howManyItems: howManyItems,
          shuffle,
          itemsArray,
        })
      } else {
        console.log('third')

        //zrób coś jeśli nie ma quizu dla tego topika
      }
    } catch (e) {
      // console.warn(e)
    }
  }

  return openQuiz
}

export default useOpenQuiz
