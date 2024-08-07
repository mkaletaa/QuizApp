//* This file contains all functions that are needed for the app in order to perform memory operations
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getValue(key) {
  try {
    const existingValue = await AsyncStorage.getItem(key)

    if (existingValue) {
      const savedValue = JSON.parse(existingValue)
      return savedValue
    } else {
      return null
    }
  } catch (error) {
    //remove the key if it hasn't been found
    removeItemValue(key)
    console.error('Could not get the item: ', error, key)
    return null // return null in case of an error
  }
}

export async function removeKey(key) {
  try {
    await AsyncStorage.removeItem(key)
    console.log('The key has been deleted successfully: ', key)
  } catch (e) {
    console.log('An error occurred while removing the key:', e)
  }
}

export async function setValue(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    console.log('New value has been set successfully: ', key, value)
  } catch (e) {
    console.log('An error occurred while setting the key: ', e)
  }
}

export const removeQuestion = async id => {
  try {
    const savedItems = await AsyncStorage.getItem('savedItems')
    // // console.log("🚀 ~ removeQuestion ~ savedItems:", savedItems)
    let parsedSavedItems = savedItems ? JSON.parse(savedItems) : []
    // // console.log("🚀 ~ removeQuestion ~ parsedSavedItems:", parsedSavedItems)

    parsedSavedItems = parsedSavedItems.filter(savedItem => savedItem !== id)

    await AsyncStorage.setItem('savedItems', JSON.stringify(parsedSavedItems))
    console.log('Removed question successfully!')
  } catch (error) {
    console.error('Error removing item: ', error)
  }
}

export const setStats = async id => {
  try {

    // Pobierz wartość z AsyncStorage
    let goodAnsCount = await AsyncStorage.getItem('goodAnsCount')
    goodAnsCount = goodAnsCount
    ? JSON.parse(goodAnsCount) + 1
    : 1
    
    // Zapisz zaktualizowaną wartość do AsyncStorage
    await AsyncStorage.setItem('goodAnsCount', JSON.stringify(goodAnsCount))
    
    //-------
    
    const [chapter, topic] = id.split('|')

    // console.log("🚀 ~ setStats ~ --------------")
    // console.log("🚀 ~ setStats ~ topic:", topic)
    // console.log("🚀 ~ setStats ~ chapter:", chapter)
    
    // console.log("🚀 ~ setStats ~ goodAnsCount:", goodAnsCount)
    {
      const key = `${chapter}|goodAnsCount`

      // console.log("🚀 ~ setStats ~ key:", key)
      let chapterGoodAnsCount = await AsyncStorage.getItem(key)
      chapterGoodAnsCount = chapterGoodAnsCount
      ? JSON.parse(chapterGoodAnsCount) + 1
      : 1
      
      await AsyncStorage.setItem(key, JSON.stringify(chapterGoodAnsCount))
      // console.log("🚀 ~ setStats ~ chapterGoodAnsCount:", chapterGoodAnsCount)
    }

    //--------

    {
      const key = `${chapter}|${topic}|goodAnsCount`

      // console.log("🚀 ~ setStats ~ key:", key)
      let topicGoodAnsCount = await AsyncStorage.getItem(key)
      topicGoodAnsCount = topicGoodAnsCount
      ? JSON.parse(topicGoodAnsCount) + 1
      : 1
      
      await AsyncStorage.setItem(key, JSON.stringify(topicGoodAnsCount))
      // console.log("🚀 ~ setStats ~ topicGoodAnsCount:", topicGoodAnsCount)
    }
  } catch (error) {
    console.error(('Error setting achievement stat: ', error))
  }
}

// export default function useAsyncStorage() {
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

// async function storeFinishedQuizStat(topicName, resultsArray) {
//   try {
//     let nrOfCorrect = 0
//     for (const result of resultsArray) {
//       if (result.isCorrect === 'correct') nrOfCorrect++
//     }

//     const existingTopicStat = await AsyncStorage.getItem(topicName)

//     let savedTopicStat = {}

//     if (existingTopicStat) savedTopicStat = JSON.parse(existingTopicStat)

//     // Utwórz właściwość, jeśli nie istnieje
//     savedTopicStat.nrOfFinished = (savedTopicStat.nrOfFinished || 0) + 1
//     savedTopicStat.lastFinished = Date.now()

//     // Sprawdź i utwórz właściwość, jeśli nie istnieje
//     if (nrOfCorrect === resultsArray.length)
//       savedTopicStat.allCorrect = (savedTopicStat.allCorrect || 0) + 1

//     // Sprawdź i utwórz właściwość, jeśli nie istnieje
//     if (
//       savedTopicStat.bestResult < (nrOfCorrect / resultsArray.length) * 100 ||
//       !savedTopicStat.bestResult
//     )
//       savedTopicStat.bestResult = (nrOfCorrect / resultsArray.length) * 100

// // //     console.log('🚀 ~ useAsyncStorage ~ savedTopicStat:', savedTopicStat)
//     //zapisz jeszcze kiedy ostatnio kiedy ostatnio zrobiono quiz w ogóle i może kiedy ostatnio zrobiono tę kategorię

//     await AsyncStorage.setItem(topicName, JSON.stringify(savedTopicStat))
//   } catch (error) {
//     console.error('Could not store finished stat:', error)
//   }
// }

//   return { getValue, removeKey }
// }