import { Button } from 'react-native'
import useOpenQuiz from '../../hooks/useOpenQuiz'
import { takeAQuiz } from '../../../data/texts'
import React from 'react'

export default function QuizButton({ topicName, chapterName }) {

const {openQuiz, noQuestionModal} = useOpenQuiz()


  return (
    <React.Fragment>

    <Button
      title={takeAQuiz}
      color="rgb(0, 150, 255)"
      onPress={() => openQuiz({topicName, chapterName})}
      />
      {noQuestionModal()}
      </React.Fragment>
  )
}
