import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'
import { topics } from '../../data/data'
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
      itemsM.splice(randomNr, 1)
      setItemsArray(itemsM)

      return quiz[catName][topicName][randomItemNr]
    }

    randomItem = returnItem(itemsArray)

    return randomItem
  }



  function countItemsInCategories(catArray): number {
    // console.log('🚀 ~ countItems ~ catName:', catName)
    let itemsCount = 0

    return
    //jeśli topArray jest puste to znaczye user przeszedł do quizu z poziomu kategorii
      for (let i = 0; i < catArray.length; i++) {
        for (let j = 0; j < countTopics(catArray[i]); j++) {
          let itemsArray: Array<Item> = quiz[catArray[i]][catArray[i][j]]
          console.log('🚀 ~ countItems ~ itemsArray:', itemsArray)
          itemsCount += itemsArray.length
        }
      }
    return itemsCount
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

  return { importItem, countItemsInTopics, countItemsInCategories, importRandomItem, countTopics, getTopicsForCategory }
}

export default useQuizData
