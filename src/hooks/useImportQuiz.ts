// hooks/useImportQuiz.js
import { useNavigation } from '@react-navigation/native'
import { quiz } from '../../data/quiz/quizModule'

const useImportQuiz = () => {
  const navigation = useNavigation()

  const importQuiz = (
    chosenTopicsArray: Array<string>, //an array of topics tahat user chosen to have a quiz
    categoryName: string, //the category of the chosen topics
    topics,
    returnItems: boolean = false //all topics of all categories available in the app
  ) => {
    let items = []

    for (const chosenTopic of chosenTopicsArray) {
      for (const topic of topics[categoryName]) {
        if (topic.name === chosenTopic) {
          items.push(...quiz[categoryName][chosenTopic])
          break
        }
      }
    }

    let shouldShuffle = false
    if(shouldShuffle)

    items = shuffle(items)

    if (returnItems) return items

    const headerText: string =
      chosenTopicsArray.length === 1 ? chosenTopicsArray[0] : 'all'
    //@ts-ignore
    navigation.navigate('Quiz', { quiz: items, topicName: headerText })
  }

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[items[i], items[j]] = [items[j], items[i]]
    }
    return items 
  }

  return importQuiz
}

export default useImportQuiz
