import { Button } from "react-native";
import { useNavigation } from '@react-navigation/native'
import useQuizData from '../../hooks/useQuizData'

export default function QuizButton({topicName, chapterName}){
  const navigation = useNavigation()
  const { countItemsInTopics } = useQuizData()

      const showQuiz = (
        topicName: string,
        chapterName: string
        // howManyItems: number | null = null
      ): void => {
        //* można tez zrobić że tutaj się pobierają pytania, i przekazywane w formie topArray lub przez zustand
        //@ts-ignore
        navigation.navigate('Quiz', {
          topName: topicName,
          chapName: chapterName,
          howManyItems: countItemsInTopics(topicName, chapterName),
          shuffle: false,
        })

        // setHowManyItems(null)
      }

    return (
      <Button
        title="take a quiz"
        color="rgb(0, 150, 255)"
        onPress={() => showQuiz(topicName, chapterName)}
      />
    )
}