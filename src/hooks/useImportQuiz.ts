// hooks/useImportQuiz.js
import { useNavigation } from '@react-navigation/native'
import { cat_1 as quiz } from '../../data/quiz/quizModule'

type topicType = string | Map<string, boolean>

const useImportQuiz = () => {
  const navigation = useNavigation()

  const importQuiz = async (topic: topicType, categoryName: string, topics) => {
    let topicMap

    if (typeof topic === 'string') {
      // Jeśli topic nie jest mapą, zamień go na mapę
      topicMap = new Map([[topic, true]])
    } else {
      // Jeśli już jest mapą, przypisz go bezpośrednio
      topicMap = topic
    }

    // Iteruj przez mapę
    let items = []
    topicMap.forEach((value, key) => {
      if (value) {
        for (const topic of topics[categoryName]) {
          if (topic.name === key) {
            console.log('🚀 ~ topicMap.forEach ~ key:', key)
            console.log('🚀 ~ topicMap.forEach ~ topic:', topic.name)
            items.push(...quiz[key])
            //gdyby quiz skladalo sie tez z kategorii to chyba wystarczy ...quiz[category][key]
            break
          }
        }
      }
    })

    // Sprawdź, ile kluczy spełnia warunek true
    const trueKeysCount = Array.from(topicMap.values()).filter(Boolean).length

    // Ustaw topicName na odpowiednią wartość
    const topicName =
      trueKeysCount === 1
        ? Array.from(topicMap.entries()).find(([_, value]) => value === true)[0]
        : 'all' //tutaj jest bug

    //@ts-ignore
    navigation.navigate('Quiz', { quiz: items, topicName })
  }

  return importQuiz
}

export default useImportQuiz
