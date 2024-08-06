import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { quiz } from '../../data/quiz/quizModule'
import { noQuestions } from '../../data/texts'
import CustomModal from '../components/CustomModal'
import { Item } from '../utils/types'
import { getValue } from '../utils/utilStorage'
import { StackActions } from '@react-navigation/native'


  //** this hook is used always before Quiz screen is opened */
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
  ? Kiedy Quiz z pojedynczego topika
  ? Jeśli klikniemy na kartę topika lub przycik otwarcia quizu z Theory to trafiają tu tylko chapterName i topicName

  ? Kiedy Quiz z zapisanych pytań
  ? trafiają tu tylko chapterName = "__Saved__" , itemsArray: Item[] (zapisane pytania) , howManyItems = liczba zapisanych pytań

  ? Kiedy Quiz z inifinityMode
  ? Jeśli klikniemy na RandomQuestionButton to trafiają tu tylko chapterName i topicName='', chapterName, howManyItems = Infinity, shuffle= true

  ? Kiedy Quiz poprawkowy
  ? Trafiają tu chapterName = "__Again__", itemsArray: Item[] (tablica pytań do ponownego zagrania), howManyItems - wiadomo, isRetake = true
  */

  //* kiedy jest infinityMode to nazwa topika jest równa ""

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
      navigate()
      //jeśli jest pytania z saved lub retake lub Card/Theory (rozdział i dany topik ma quiz)
    } else if (itemsArray || quiz[chapterName][topicName]) {
      // check if questions should be shuffled
      ;(async function() {
        shuffle = await getValue('shuffle')
        navigate()
      })()
    } else {
      //if pressed topic doesn not have a quiz
      setShowNoQuestionsModal(true)
    }

    //this function changes screen to Quiz.
    function navigate() {
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
          //must be replace instead of navigate because otherwise Quiz screen woludn't be refreshed
          StackActions.replace('Quiz', quizParams)
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
