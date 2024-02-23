import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'
import { topics, categories } from '../../data/data'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

//* UWAGA: można rozważyć włożenie do obiektów items i categories klucz z ilością topików/itemów żeby przyspieszyć działanie aplikacji

const useQuizData = () => {
  function importItem(
    cat: string,
    top: string,
    whichItem: number
  ): Item | null {
    let item: Item
    item = quiz[cat][top][whichItem] //jeśli item === null już wszystkie itemy z tego topica zostały pobrane
    if (item === undefined || item === null) return null
    return item
  }

  function importItemById(id: string): Item {
    const [category, topic] = id.split('|')

    // const topicIndex: number = quiz[category].findIndex(item => item.id === id)
    const itemIndex: number = quiz[category][topic].findIndex(
      item => item.id === id
    )
    // console.log("🚀 ~ importItemById ~ index:", index)

    return quiz[category][topic][itemIndex]
  }

  const [itemsArray, setItemsArray] = useState([])
  // [{ name: 'nazwa topica', nr, 1 }]
  function importRandomItem(catName: string, topArray: string[]) {
    let itemsH = [] //pojemnik na obiekty {name, items}
    let randomItem: Item

    if (itemsArray.length === 0) {
      //jeśli itemsMatric jest puste, zapełnij je
      for (let i = 0; i < topArray.length; i++) {
        let itemsArray: Array<Item> = quiz[catName][topArray[i]]

        for (let j = 0; j < itemsArray.length; j++) {
          itemsH.push({ topName: topArray[i], nr: j })
        }
      }
      setItemsArray(itemsH)
      return returnItem(itemsH)
    }

    function returnItem(itemsM2) {
      let itemsM = itemsM2
      let randomNr = Math.floor(Math.random() * itemsM.length)

      let topicName = itemsM[randomNr].topName
      let randomItemNr = itemsM[randomNr].nr

      //usuwanie
      itemsM.splice(randomNr, 1)
      setItemsArray(itemsM)

      return quiz[catName][topicName][randomItemNr]
    }

    randomItem = returnItem(itemsArray)

    return randomItem
  }

  function importRandomItemAllItemsMode(): Item {
    let catNr: number = Math.floor(Math.random() * categories.length)
    let catName: string = categories[catNr].name
    let topNr: number = Math.floor(Math.random() * topics[catName].length) //można tez użyc funkcji countTopics
    let topName: string = topics[catName][topNr].name
    let itemNr: number = Math.floor(
      Math.random() * countItemsInTopics([topName], catName)
    )
    let item: Item = quiz[catName][topName][itemNr]
    return item
  }

  function importSavedItem(): Item {
    //retrieve items
    //setItemsArray()
    //zwróc itema i usuń go z itemsArray
    const fetchSavedItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('savedItems')
        if (jsonValue !== null) {
          const parsedItems = JSON.parse(jsonValue)
          let itemsH = []

          // Użyj Promise.all do równoczesnego pobierania elementów asynchronicznie
          await Promise.all(
            parsedItems.map(async id => {
              const item = await importItemById(id)
              itemsH.push(item)
            })
          )

          setItemsArray(itemsH)

          // Dodaj warunek sprawdzający, czy istnieją elementy przed zwróceniem
          if (itemsH.length > 0) {
            console.log("🚀 ~ fetchSavedItems ~ itemsH kurwaa:", itemsH[0])
            return itemsH[0]
          }
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych z AsyncStorage:', error)
      }

      // Zwróć domyślną wartość w przypadku braku danych lub błędu
      return null // lub pusta tablica, obiekt, itp., w zależności od potrzeb
    }

    // Wywołaj funkcję pobierającą dane przy mountowaniu komponentu
    if (itemsArray.length === 0) fetchSavedItems()
    else {
      const itemToReturn = itemsArray.shift()
      setItemsArray(itemsArray)
      return itemToReturn
    }
  }

  function countItemsInTopics(topArray: string[], catName: string): number {
    // console.log('🚀 ~ countItems ~ catName:', catName)
    let itemsCount = 0

    for (let j = 0; j < topArray.length; j++) {
      let itemsArray: Array<Item> = quiz[catName][topArray[j]]
      // console.log('🚀 ~ countItems ~ itemsArray:', itemsArray)
      itemsCount += itemsArray.length
    }

    return itemsCount
  }

  function countTopics(catName): number {
    return topics[catName].length
  }

  function getTopicsForCategory(catName): Array<string> {
    return topics[catName].map(topic => topic.name)
  }

  function getAllTopics(): string[] {
    let topics: Array<string> = []
    for (const catName in Object.keys(topics)) {
      topics.push(...getTopicsForCategory(catName))
    }
    return topics
  }

  return {
    importItem,
    countItemsInTopics,
    importRandomItem,
    countTopics,
    getTopicsForCategory,
    importRandomItemAllItemsMode,
    getAllTopics,
    importItemById,
    importSavedItem,
  }
}

export default useQuizData
