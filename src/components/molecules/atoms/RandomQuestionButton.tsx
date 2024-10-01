import { Button as PaperButton } from 'react-native-paper'

import { randomQuestion } from '../../../../data/texts'
import useOpenQuiz from '../../../hooks/useOpenQuiz'
import { Colors } from '../../../utils/constants'

export default function RandomQuestionButton({ chapName }) {
  const { openQuiz, noQuestionModal } = useOpenQuiz()

  function instantQuestion() {
    try {
      openQuiz({
        // topicName: '',
        chapterName: chapName,
        itemsCount: Infinity,
        shuffle: true,
      })
    } catch (e) {
      console.error(e)
    }
    return
  }

  return null
}
