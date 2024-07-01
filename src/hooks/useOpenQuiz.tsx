import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { quiz } from '../../data/quiz/quizModule'
import { noQuestions } from '../../data/texts'
import CustomModal from '../components/CustomModal'
import { Item } from '../utils/types'
import { getValue } from '../utils/utilStorage'

const useOpenQuiz = () => {
  const navigation = useNavigation()
  const [showNoQuestionsModal, setShowNoQuestionsModal] = useState(false)

  type openQuizPropType = {
    topicName?: string
    chapterName: string
    howManyItems?: number
    shuffle?: boolean
    itemsArray?: Item[]
  }

  const openQuiz = ({
    topicName,
    chapterName,
    howManyItems,
    shuffle,
    itemsArray,
  }: openQuizPropType): void => {
    //jeśli jest rozdział i wybrano infinity mode
    //* kiedy jest infinityMode to nazwa topika jest równa ""
    if (howManyItems === Infinity) {
      shuffle = true
      navigate()
      //jeśli jest pytania z saved lub rozdział i dany topik ma quiz
    } else if (itemsArray || quiz[chapterName][topicName]) {
      // console.log(itemsArray)
      ;(async function gV() {
        shuffle = await getValue('shuffle')
        navigate()
      })()
    } else {
      //jeśli kliknięty topik nie ma quizu
      setShowNoQuestionsModal(true)
    }

    function navigate() {
      // console.log("dd")
      //@ts-ignore
      navigation.navigate('Quiz', {
        topName: topicName,
        chapName: chapterName,
        howManyItems: howManyItems,
        shuffle,
        itemsArray,
      })
    }
  }

  const noQuestionModal = () => {
    return (
      // null
      <CustomModal
        visible={showNoQuestionsModal}
        onRequestClose={() => setShowNoQuestionsModal(false)}
        text={noQuestions}
      >
        {/* <Button
          title="ok"
          onPress={() => setShowNoQuestionsModal(false)}
        ></Button> */}
      </CustomModal>
    )
  }

  return { openQuiz, noQuestionModal }
}

export default useOpenQuiz
