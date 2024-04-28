import { Button } from 'react-native'
import useOpenQuiz from '../../hooks/useOpenQuiz'
import { takeAQuiz } from '../../../data/texts'
import React from 'react'
import useStore from '../../utils/store'
export default function QuizButton({ topicName, chapterName }) {
  const { openQuiz, noQuestionModal } = useOpenQuiz()

  const setShowPrompt = useStore(state => state.setShowPrompt)

  return (
    <React.Fragment>
      <Button
        title={takeAQuiz}
        color="rgb(0, 150, 255)"
        onPress={() => {
          openQuiz({ topicName, chapterName })
          setShowPrompt(false)
        }}
      />
      {noQuestionModal()}
    </React.Fragment>
  )
}
