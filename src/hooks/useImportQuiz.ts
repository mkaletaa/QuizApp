// hooks/useImportQuiz.js
import { useNavigation } from '@react-navigation/native'
import { quiz } from '../../data/quiz/quizModule'

const useImportQuiz = () => {
  const navigation = useNavigation()

  const importQuiz = async (
    chosenTopicsArray: Array<string>, //an array of topics taht user chosen to have a quiz
    categoryName: string, //the category of the chosen topics
    topics //all topics of all categories available in the app
  ) => {

    
    // Iteruj przez tablicę
    let items = []
    
    for(const chosenTopic of chosenTopicsArray) {
      for (const topic of topics[categoryName]) {
        if (topic.name === chosenTopic) {
          // console.log('🚀 ~ topicMap.forEach ~ key:', chosenTopic)
          // console.log('🚀 ~ topicMap.forEach ~ topic:', topic.name)
          items.push(...quiz[categoryName][chosenTopic])
          //gdyby quiz skladalo sie tez z kategorii to chyba wystarczy ...quiz[category][chosenTopic]
          break
        }
      }
    }
    
    
    const headerText:string = chosenTopicsArray.length === 1 ? chosenTopicsArray[0] : 'all'

    //@ts-ignore
    navigation.navigate('Quiz', { quiz: items, topicName:headerText })
  }

  return importQuiz
}

export default useImportQuiz
