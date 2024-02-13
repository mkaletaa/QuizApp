// hooks/useImportQuiz.js
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { quiz } from '../../data/quiz/quiz'
import { quiz as quiz2 } from '../../data/quiz/quiz2'

const useImportQuiz = () => {
  const navigation = useNavigation()

  const importQuiz = useCallback(
    async topicName => {
      switch (topicName) {
        case 'top_1':
          {
            // const quiz = quiz
            //@ts-ignore
            navigation.navigate('Quiz', { quiz, topicName })
            console.log('first')
          }
          break

        case 'top_2':
          {
            const quiz = quiz2
            //@ts-ignore
            navigation.navigate('Quiz', { quiz, topicName })
            console.log('second')
          }
          break

        case 'all':
          {
            //@ts-ignore
            navigation.navigate('Quiz', { quiz, topicName: 'all' })
            console.log('ALL TOPICS')
          }
          break

        default:
          //@ts-ignore
          navigation.navigate('Quiz', { quiz, topicName })
          console.log('default', topicName)
          break
      }
    },
    [navigation]
  )

  return importQuiz
}

export default useImportQuiz
