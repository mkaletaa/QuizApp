import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'
import { topics, categories } from '../../data/data'
import { useState } from 'react'

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
      //jeśli infinity mod to nie usuwac lub lepiej stworzyć osobną funkcję
      itemsM.splice(randomNr, 1)
      setItemsArray(itemsM)

      return quiz[catName][topicName][randomItemNr]
    }

    randomItem = returnItem(itemsArray)

    return randomItem
  }


  function importRandomItemAllItemsMode(): Item{
    console.log('ededfirst')
      let catNr: number = Math.floor(Math.random() * categories.length)
      console.log("🚀 ~ importRandomItemAllItemsMode ~ catNr:", catNr)
      let catName: string = categories[catNr].name
      console.log("🚀 ~ importRandomItemAllItemsMode ~ catName:", catName)
      let topNr: number = Math.floor(Math.random() * topics[catName].length) //można tez użyc funkcji countTopics
      console.log("🚀 ~ importRandomItemAllItemsMode ~ topNr:", topNr)
      let topName: string = topics[catName][topNr].name
      console.log("🚀 ~ importRandomItemAllItemsMode ~ topName:", topName)
      let itemNr: number = Math.floor(Math.random() * countItemsInTopics([topName], catName))
      console.log("🚀 ~ importRandomItemAllItemsMode ~ itemNr:", itemNr)
      let item: Item =  quiz[catName][topName][itemNr]
      console.log(
        '🚀 ~ importRandomItemAllItemsMode ~ item:',
        quiz[catName][topName][itemNr]
      )
      return item
  }

    function countItemsInTopics(topArray: string[], catName:string): number {
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

  function getTopicsForCategory(catName): Array<string>{
    return topics[catName].map(topic => topic.name)
  }

  function getAllTopics(): string[]{
    let topics: Array<string> = []
    for(const catName in Object.keys(topics)){
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
    getAllTopics
  }
}

export default useQuizData
