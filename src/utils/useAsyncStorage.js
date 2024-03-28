import AsyncStorage from '@react-native-async-storage/async-storage'
//todo: zmienić to na util fn a nie hook
export default function useAsyncStorage() {
  //do zapisywania w storage po udzieleniu odpowiedzi na pytanie

  // async function storeItemStat(id, result) {
  //   const [category, topic] = id.split('|')

  //   try {
  //     const existingTopicStat = await AsyncStorage.getItem(topic)
  //     const existingCategoryStat = await AsyncStorage.getItem(category)

  //     let savedTopicStat = existingTopicStat
  //       ? JSON.parse(existingTopicStat)
  //       : {}
  //     let savedCategoryStat = existingCategoryStat
  //       ? JSON.parse(existingCategoryStat)
  //       : {}

  //     savedTopicStat.answers = (savedTopicStat.answers || 0) + 1
  //     savedCategoryStat.answers = (savedCategoryStat.answers || 0) + 1

  //     await AsyncStorage.setItem(topic, JSON.stringify(savedTopicStat))
  //     await AsyncStorage.setItem(category, JSON.stringify(savedCategoryStat))
  //   } catch (error) {
  //     console.error('Could not store stat:', error)
  //   }
  // }

  // import AsyncStorage from '@react-native-async-storage/async-storage'

  async function storeFinishedQuizStat(topicName, resultsArray) {
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
      if (
        savedTopicStat.bestResult < (nrOfCorrect / resultsArray.length) * 100 ||
        !savedTopicStat.bestResult
      )
        savedTopicStat.bestResult = (nrOfCorrect / resultsArray.length) * 100

      console.log('🚀 ~ useAsyncStorage ~ savedTopicStat:', savedTopicStat)
      //zapisz jeszcze kiedy ostatnio kiedy ostatnio zrobiono quiz w ogóle i może kiedy ostatnio zrobiono tę kategorię

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



  return { storeFinishedQuizStat, getValue }
}
