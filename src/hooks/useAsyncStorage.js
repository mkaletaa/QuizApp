import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAsyncStorage() {
  //do zapisywania w storage po udzieleniu odpowiedzi na pytanie

  async function storeItemStat(id, result) {
    const [category, topic] = id.split('|')

    try {
      const existingTopicStat = await AsyncStorage.getItem(topic)
      const existingCategoryStat = await AsyncStorage.getItem(category)

      let savedTopicStat = existingTopicStat
        ? JSON.parse(existingTopicStat)
        : {}
      let savedCategoryStat = existingCategoryStat
        ? JSON.parse(existingCategoryStat)
        : {}

      savedTopicStat.answers = (savedTopicStat.answers || 0) + 1
      savedCategoryStat.answers = (savedCategoryStat.answers || 0) + 1

      //  if (result === 'correct') {
      //    savedTopicStat.correctAnswers = (savedTopicStat.correctAnswers || 0) + 1
      //    savedCategoryStat.correctAnswers =
      //      (savedCategoryStat.correctAnswers || 0) + 1
      //  } else if (result === 'incorrect') {
      //    savedTopicStat.incorrectAnswers =
      //      (savedTopicStat.incorrectAnswers || 0) + 1
      //    savedCategoryStat.incorrectAnswers =
      //      (savedCategoryStat.incorrectAnswers || 0) + 1
      //  } else if (result === 'kindof') {
      //    savedTopicStat.kindOfAnswers = (savedTopicStat.kindOfAnswers || 0) + 1
      //    savedCategoryStat.kindOfAnswers =
      //      (savedCategoryStat.kindOfAnswers || 0) + 1
      //  }

      await AsyncStorage.setItem(topic, JSON.stringify(savedTopicStat))
      await AsyncStorage.setItem(category, JSON.stringify(savedCategoryStat))
    } catch (error) {
      console.error('Could not store stat:', error)
    }
  }

// import AsyncStorage from '@react-native-async-storage/async-storage'

async function storeFinishedQuizStat(topicName, catName, resultsArray) {
  try {
    let nrOfCorrect = 0
    for (const result of resultsArray) {
      if (result.isCorrect === 'correct') nrOfCorrect++
    }

    const existingTopicStat = await AsyncStorage.getItem(topicName)

    let savedTopicStat = {}

    if (existingTopicStat) savedTopicStat = JSON.parse(existingTopicStat)

    // Utwórz właściwość, jeśli nie istnieje
    savedTopicStat.nrOfFinished = (savedTopicStat.nrOfFinished || 0) + 1
    savedTopicStat.lastFinished = Date.now()

    // Sprawdź i utwórz właściwość, jeśli nie istnieje
    if (nrOfCorrect === resultsArray.length)
      savedTopicStat.allCorrect = (savedTopicStat.allCorrect || 0) + 1

    // Sprawdź i utwórz właściwość, jeśli nie istnieje
    if (savedTopicStat.bestResult < (nrOfCorrect / resultsArray.length) * 100)
      savedTopicStat.bestResult = (nrOfCorrect / resultsArray.length) * 100

    console.log('🚀 ~ useAsyncStorage ~ savedTopicStat:', savedTopicStat)

    await AsyncStorage.setItem(topicName, JSON.stringify(savedTopicStat))
  } catch (error) {
    console.error('Could not store finished stat:', error)
  }
}


  async function getValue(key) {
    try {
      const existingValue = await AsyncStorage.getItem(key)

      if (existingValue) {
        const savedValue = JSON.parse(existingValue)
        return savedValue
      } else {
        return null
      }
    } catch (error) {
      console.error('Could not get the item:', error)
      return null // Dodane zwracanie null w przypadku błędu
    }
  }

  return { storeItemStat, storeFinishedQuizStat, getValue }
}
