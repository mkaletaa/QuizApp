import { Button } from 'react-native'
import useOpenQuiz from '../../hooks/useOpenQuiz'

export default function QuizButton({ topicName, chapterName }) {

const openQuiz = useOpenQuiz()


  return (
    <Button
      title="take a quiz"
      color="rgb(0, 150, 255)"
      onPress={() => openQuiz(topicName, chapterName)}
    />
  )
}
