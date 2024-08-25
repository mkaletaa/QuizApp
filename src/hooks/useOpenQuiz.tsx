import { StackActions, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert } from 'react-native';



import { quiz } from '../../data/quiz/quizModule';
import { noQuestions } from '../../data/texts';
import CustomModal from '../components/CustomModal';
import { Item } from '../utils/types';
import { getValue } from '../utils/utilStorage';


//** This hook is used always before the Quiz screen is opened
//** It prepares everything what is needed in order to start a quiz

/*
 * There are a few scenarios where this hook is invoked:
 * 1 (aka 'Card') User pressed a Card in the `Topics` screen or pressed a button (there are 2 available) in a `Theory` screen.
 * 2 (aka 'RQB') User pressed RandomQuestionButton which opens quiz in InfinityMode
 * 3 (aka 'retake') User is in `QuizResults` screen and pressed one out of two buttons that enable to retake a quiz
 * 4 (aka 'saved') User pressed a button inside `Saved` screen and is taking a quiz out of saved questions (items)
 *
 *
 * Depending on the the scenario, different props are passed to the `openQuiz` function:
 *
 * 1: Only chapterName and topicName are passed. There is no more explanation needed
 * 2: Only chapterName, itemsCount = Infinity, shuffle= true. If it has been pressed in `Chapters` screen, chapterName = '__All__'
 * 3: chapterName = "__Again__", itemsArray, itemsCount, isRetake = true are passed. itemsArray is of type Item[] and it is simply an array of questions to answer again. itemsCount is the size of itemsArray
 * 4: Like 3, but chapterName = '__Saved__'
 */
const useOpenQuiz = () => {
  const navigation = useNavigation()
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false)

  type openQuizPropType = {
    //? not sure if there should be `?` after topicName
    topicName?: '' | string //equal to '' in all scenarios except 'Card'
    //todo: change __Again__ to __Retake__
    chapterName: '__All__' | '__Again__' | '__Saved__' | string
    // __All__ - scenario 2 (RQB)
    // __Again__ - scenario 3 (retake)
    // __Saved__ - scenario 4 (saved)
    // other - scenario 1 (Card)
    itemsCount?: number //used when retake or saved
    shuffle?: boolean //true if InfinityMode (RQB), otherwise undefined and will be set later on
    itemsArray?: Item[] //used when retake or saved, otherwise undefined
    isRetake?: boolean //true if retaking quiz, otherwise undefined
  }

  // this function prepares necessary data for the quiz
  const openQuiz = ({
    topicName = '',
    chapterName,
    itemsCount,
    shuffle,
    itemsArray,
    isRetake = false,
  }: openQuizPropType): void => {
    //* executes in scenario 'RQB' and there are no questions available OR in scenario 'Card' and whole chapter has no quizes
    if (
      !quiz.hasOwnProperty(chapterName) &&
      chapterName !== '__Saved__' &&
      chapterName !== '__Again__' &&
      chapterName !== '__All__'
    ) {
      Alert.alert('RQB, no quiz available')
      setShowNoQuestionsModal(true)
      // return
    } // merged this with the rest of if statements. I see no bugs yet
    //* executes in scenario 'RQB' and there are questions available
    else if (itemsCount === Infinity) {
      Alert.alert('RQB, quiz available')
      navigateToQuiz()
    }
    //* executes in scenario 'Card' (and there is a quiz available) OR in scenario 3 'retake' OR in scenario 4 'saved'. This is the most common case
    else if (itemsArray || quiz[chapterName][topicName]) {
      Alert.alert('Card (quiz available) OR retake OR saved, quiz available')
      // check if questions should be shuffled
      ;(async () => {
        shuffle = await getValue('shuffle')
        navigateToQuiz()
      })()
    }
    //* executes in scenario 'Card' (and there is no quiz available)
    else {
      Alert.alert('Card, no quiz available')
      setShowNoQuestionsModal(true)
    }

    function navigateToQuiz() {
      const quizParams = {
        topName: topicName,
        chapName: chapterName,
        howManyItems: itemsCount,
        shuffle,
        itemsArray,
      }

      //scenario 3 (retake)
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

  //if no quiz is associated with a given topic this component appears on the screen
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