import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { useState } from 'react'

import { quiz } from '../../data/quiz/quizModule'
import { noQuestions } from '../../data/texts'
import CustomModal from '../components/CustomModal'
import { Item } from '../utils/types'
import { getValue } from '../utils/utilStorage'

//** this hook is used always before Quiz screen is opened
const useOpenQuiz = () => {
  const navigation = useNavigation()
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false)

  type openQuizPropType = {
    topicName?: string
    chapterName: string
    howManyItems?: number //used when retaking or saved
    shuffle?: boolean //true if InfinityMode, otherwise undefined
    itemsArray?: Item[] //used when retaking or saved
    isRetake?: boolean //true if retaking quiz, undefined otherwise
  }

  /* 
  * When quiz id from a single Topic
  * If we press the topic Card or quiz button from Theory, only chapterName and topicName are passed here

  * When quiz from saved questions
  * Here are passed only props like: chapterName = "__Saved__" , itemsArray: Item[] (saved questions) , howManyItems = number of saved questions

  * When quiz from random question button (infinity mode)
  * If we press RandomQuestionButton here are passed only chapterName and topicName = '', howManyItems = Infinity, shuffle= true

  * When retaking a quiz
  * Here are passed chapterName = "__Again__", itemsArray: Item[] (array of questions to answer again), howManyItems - you know, isRetake = true
  */

  //* when infinity mode is enabled, topic name is an empty string ("")

  //this function prepares necessary data for the quiz
  const openQuiz = ({
    topicName,
    chapterName,
    howManyItems,
    shuffle,
    itemsArray,
    isRetake = false, // if user is retaking the same quiz
  }: openQuizPropType): void => {
    
    //if there is a chapter and infinity mode has been chosen
    if (howManyItems === Infinity) {
      navigateToQuiz()
      //if  retake or saved or pressed Card/Quiz button from Theory (chapter and given topic have a quiz)
    } else if (itemsArray || quiz[chapterName][topicName]) {
      // check if questions should be shuffled
      ;(async () => {
        shuffle = await getValue('shuffle')
        navigateToQuiz()
      })()
    } else {
      //if pressed topic does not have a quiz
      setShowNoQuestionsModal(true)
    }

    function navigateToQuiz() {
      const quizParams = {
        topName: topicName,
        chapName: chapterName,
        howManyItems: howManyItems,
        shuffle,
        itemsArray,
      }

      //if user retakes quiz (buttons in QuizResults)
      if (isRetake) {
        navigation.dispatch(
          //must be replace instead of navigate because otherwise Quiz screen wouldn't be refreshed
          StackActions.replace('Quiz', quizParams),
        )
        return
      }

      //@ts-ignore
      navigation.navigate('Quiz', quizParams)
    }
  }

  //if no quiz is associated with a given topic this component appears on screen
  const noQuestionModal = () => {
    return (
      <CustomModal
        visible={showNoQuestionsModal}
        onRequestClose={() => setShowNoQuestionsModal(false)}
        text={noQuestions}
      />
    )
  }

  return { openQuiz, noQuestionModal }
}

export default useOpenQuiz
