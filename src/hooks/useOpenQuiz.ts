import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { quiz } from '../../data/quiz/quizModule'

const useOpenQuiz = () => {
  const navigation = useNavigation()
  // const { countItemsInTopics } = useQuizData()
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false)
  //tutaj trzeba użyć zustand to otwierania modala

  const openQuiz = (
    topicName: string,
    chapterName: string,
    howManyItems?: number,
    shuffle: boolean = true,
    itemsArray?: string[] //nie wiem czy nie trzeba Item[]
  ): void => {

      //jeśli nie ma żadnego quizu w tej kategorii
      if (!quiz[chapterName]) {
        console.warn('brak quizu')
        setShowNoQuestionsModal(true)
      }
      //jeśli jest rozdział i dany topik ma quiz lub wybrano infinity mode
      //? kiedy jest infinityMode to nazwa topika jest równa ""
      else if (quiz[chapterName][topicName] || howManyItems === Infinity) {
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
        //jeśli kliknięty topik nie ma quizu
        setShowNoQuestionsModal(true)

        //zrób coś jeśli nie ma quizu dla tego topika
      }

  }

  return {openQuiz, showNoQuestionsModal, setShowNoQuestionsModal}
}

export default useOpenQuiz
