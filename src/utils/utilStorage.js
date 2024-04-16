import AsyncStorage from '@react-native-async-storage/async-storage'
//todo: zmienić to na util fn a nie hook
export async function getValue(key) {
  console.log('key , key', key)
  try {
    const existingValue = await AsyncStorage.getItem(key)

    if (existingValue) {
      const savedValue = JSON.parse(existingValue)
      console.log("savedItems: ",savedValue)
      return savedValue
    } else {
      return null
    }
  } catch (error) {
    removeItemValue(key)
    console.error('Could not get the item:', error, key)
    //usuń klucz jeśli nie został znaleziony
    return null // Dodane zwracanie null w przypadku błędu
  }
}

// Usuwanie klucza
export async function removeKey(key) {
  try {
    await AsyncStorage.removeItem(key)
    console.log('Klucz został pomyślnie usunięty! ', key)
  } catch (e) {
    console.log('Wystąpił błąd podczas usuwania klucza:', e)
  }
}

// Ustawianie nowego klucza
export async function setValue(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Nowy klucz został pomyślnie ustawiony!');
  } catch (e) {
    console.log('Wystąpił błąd podczas ustawiania nowego klucza:', e);
  }
}

//removes question item
export const removeItem = async (id) => {
  console.log("id: ", id)
  try {
    const savedItems = await AsyncStorage.getItem('savedItems')
    console.log('savedItems: ', savedItems)
    let parsedSavedItems = savedItems ? JSON.parse(savedItems) : []

    parsedSavedItems = parsedSavedItems.filter(
      savedItem => savedItem !== id
    )

    await AsyncStorage.setItem('savedItems', JSON.stringify(parsedSavedItems))
    // setSaved(false)
  } catch (error) {
    console.error('Error removing item:', error)
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

  //     console.log('🚀 ~ useAsyncStorage ~ savedTopicStat:', savedTopicStat)
  //     //zapisz jeszcze kiedy ostatnio kiedy ostatnio zrobiono quiz w ogóle i może kiedy ostatnio zrobiono tę kategorię

  //     await AsyncStorage.setItem(topicName, JSON.stringify(savedTopicStat))
  //   } catch (error) {
  //     console.error('Could not store finished stat:', error)
  //   }
  // }


//   return { getValue, removeKey }
// }
