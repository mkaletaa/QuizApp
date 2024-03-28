import { Button } from 'react-native'
import useOpenQuiz from '../../hooks/useOpenQuiz'
import { takeAQuiz } from '../../../data/texts'

export default function QuizButton({ topicName, chapterName }) {

const {openQuiz} = useOpenQuiz()


  return (
    <Button
      title={takeAQuiz}
      color="rgb(0, 150, 255)"
      onPress={() => openQuiz(topicName, chapterName)}
    />
  )
}
