import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { quiz } from '../../data/quiz/quizModule'
import { Button, Modal, Text } from 'react-native'
import CustomModal from '../components/CustomModal'
import { noQuestions } from '../../data/texts'

const useOpenQuiz = () => {
  const navigation = useNavigation()
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false)

  const openQuiz = (
    topicName: string,
    chapterName: string,
    howManyItems?: number,
    shuffle: boolean = true,
    itemsArray?: string[] //nie wiem czy nie trzeba Item[]
  ): void => {
    //jeśli nie ma żadnego quizu w tej kategorii
    if (!quiz[chapterName] && chapterName !== '__All__') {
      console.warn('brak quizu', chapterName)
      setShowNoQuestionsModal(true)
    }
    //jeśli jest rozdział i dany topik ma quiz lub wybrano infinity mode
    //? kiedy jest infinityMode to nazwa topika jest równa ""
    else if (howManyItems === Infinity || quiz[chapterName][topicName] ) {
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

  const noQuestionModal =()=>{
    return (
      // null
      <CustomModal
        showModal={showNoQuestionsModal}
        onRequestClose={() => setShowNoQuestionsModal(false)}
        modalText={noQuestions}
      >
        <Button
          title="ok"
          onPress={() => setShowNoQuestionsModal(false)}
        ></Button>
      </CustomModal>
    )
  }

  return { openQuiz, noQuestionModal }
}

export default useOpenQuiz
