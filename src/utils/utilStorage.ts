//* This file contains all functions that are needed for the app in order to perform memory operations
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    // removeItemValue(key)
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

export const compareInfiniteStreak = async (result: number) => {
  try {
    const bestInfiniteStreak = await getValue('infiniteStreak')
    if (bestInfiniteStreak === null || result > bestInfiniteStreak)
      setValue('infiniteStreak', result)
    console.log('comparing infinite streak succeeded')
  } catch (error) {
    console.error('Error during comparing infinite streak: ', error)
  }
}
export const compareGoodInfiniteStreak = async (result: number) => {
  try {
    const bestGoodInfiniteStreak = await getValue('goodInfiniteStreak')
    if (bestGoodInfiniteStreak === null || result > bestGoodInfiniteStreak)
      setValue('goodInfiniteStreak', result)
    console.log('comparing good infinite streak succeeded')
  } catch (error) {
    console.error('Error during comparing good infinite streak: ', error)
  }
}

export const setStats = async id => {
  try {
    // Pobierz wartość z AsyncStorage
    let goodAnsCount = await AsyncStorage.getItem('goodAnsCount')
    goodAnsCount = goodAnsCount ? JSON.parse(goodAnsCount) + 1 : 1

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
    console.error('Error setting achievement stat: ', error)
  }
}

export const setFinishedQuizStats = async function (chapter, topic) {
  try {
    const key = `${chapter}|${topic}|allGoodAnsCount`

    // console.log("🚀 ~ setStats ~ key:", key)
    let topicAllGoodAnsCount = await AsyncStorage.getItem(key)
    topicAllGoodAnsCount = topicAllGoodAnsCount
      ? JSON.parse(topicAllGoodAnsCount) + 1
      : 1

    await AsyncStorage.setItem(key, JSON.stringify(topicAllGoodAnsCount))
    console.log(
      '🚀 ~ setFinishedQuizStat ~ topicAllGoodAnsCount:',
      topicAllGoodAnsCount,
    )
  } catch (error) {
    console.error('Error using setFinishedQuizStat', error)
  }
}

//*******************/

// // Pomocnicza funkcja do pobierania streaka i daty z AsyncStorage
// const getStreakAndDate = async (
//   key: string,
//   lastDateKey: string,
// ): Promise<{ streak: number; lastDate: Date }> => {
//   try {
//     // Pobierz obecny streak z AsyncStorage
//     const streakStr = await AsyncStorage.getItem(key)
//     const streak = streakStr ? JSON.parse(streakStr) : 0

//     // Pobierz ostatnią datę streaka
//     const lastDateStr = await AsyncStorage.getItem(lastDateKey)
//     const lastDate = lastDateStr ? new Date(lastDateStr) : new Date(0) // Ustaw datę na 1 stycznia 1970 roku

//     return { streak, lastDate }
//   } catch (error) {
//     console.error('Error getting streak and date', error)
//     return { streak: 0, lastDate: new Date(0) }
//   }
// }

// // Pomocnicza funkcja do obliczeń związanych z datami i streakiem
// const calculateStreakUpdate = (
//   today: Date,
//   lastDate: Date,
//   streak: number,
// ): { newStreak: number; shouldReset: boolean } => {
//   const isSameDay = today.toDateString() === lastDate.toDateString()
//   const oneDayInMs = 24 * 60 * 60 * 1000 // 24 godziny w milisekundach
//   const timeSinceLastDate = today.getTime() - lastDate.getTime()
//   const shouldReset = !isSameDay && timeSinceLastDate > oneDayInMs

//   if (shouldReset) {
//     return { newStreak: 0, shouldReset: true }
//   } else if (!isSameDay) {
//     return { newStreak: streak + 1, shouldReset: false }
//   } else {
//     return { newStreak: streak, shouldReset: false }
//   }
// }

// // Funkcja do zwracania codziennego streaka
// export const getDailyStreak = async function (): Promise<number> {
//   try {
//     const key = 'streak'
//     const lastDateKey = 'lastStreakDate'

//     const { streak, lastDate } = await getStreakAndDate(key, lastDateKey)
//     const today = new Date()

//     const { shouldReset } = calculateStreakUpdate(today, lastDate, streak)

//     if (shouldReset) {
//       return 0
//     } else {
//       return streak
//     }
//   } catch (error) {
//     console.error('Error getting daily streak', error)
//     return -1
//   }
// }

// // Funkcja do ustawiania codziennego streaka
// export const setDailyStreak = async function (): Promise<void> {
//   try {
//     const key = 'streak'
//     const lastDateKey = 'lastStreakDate'

//     const { streak, lastDate } = await getStreakAndDate(key, lastDateKey)
//     const today = new Date()

//     const { newStreak, shouldReset } = calculateStreakUpdate(
//       today,
//       lastDate,
//       streak,
//     )

//     if (shouldReset) {
//       console.log('Zresetowano streak!')
//     } else if (newStreak > streak) {
//       console.log('Zaktualizowano streak!')
//     } else {
//       console.log('Za wcześnie na update streaka, spróbuj jutro')
//       return
//     }

//     // Zapisz nową datę
//     await AsyncStorage.setItem(lastDateKey, today.toISOString())

//     // Zapisz zaktualizowany streak
//     await AsyncStorage.setItem(key, JSON.stringify(newStreak))
//   } catch (error) {
//     console.error('Error setting daily streak', error)
//   }
// }
