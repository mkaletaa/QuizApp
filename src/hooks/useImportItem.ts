import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'
import { topics } from '../../data/data'
import { useState } from 'react'

const useImportItem = () => {
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

  const [itemsMatrix, setItemsMatrix] = useState([])
  // [{ name: '', items: [] }]
  function importRandomItem(catName: string, topArray: string[]) {
    let itemsH = [] //pojemnik na obiekty {name, items}
    let randomItem: Item

    console.log("🚀 ~ importRandomItem ~ itemsMatrix.lrngtgh:", itemsMatrix.length)
    if (itemsMatrix.length === 0) {
      // console.log('pierwszy raz')
      //jeśli itemsMatric jest puste, zapełnij je
      for (let i = 0; i < topArray.length; i++) {
        let itemsArray: Array<Item> = quiz[catName][topArray[i]]
        
        let itemsNumbers = [] //pojemnik na tablicę liczb naturalnych
        for (let j = 0; j < itemsArray.length; j++) {
          itemsNumbers.push(j)
        }
        itemsH.push({ name: topArray[i], items: itemsNumbers })
      }
      console.log("🚀 ~ importRandomItem ~ itemsHggg:", itemsH)
      setItemsMatrix(itemsH)
      console.log("🚀 ~ importRandomItem ~ itemsMatrix:", itemsMatrix)
      return returnItem(itemsH)
    }
    
    function returnItem(itemsM2) {
      // console.log('kolejny raz')
      let itemsM = itemsM2
      console.log("🚀 ~ returnItem ~ itemsM:", itemsM)
      let randomTopicNr = Math.floor(Math.random() * itemsM.length)
      // console.log("🚀 ~ returnItem ~ randomTopicNr:", randomTopicNr)
      let randomItemNrIndeks = Math.floor(
        Math.random() * itemsM[randomTopicNr].items.length
      ) //powinno być itemsM
      // console.log("🚀 ~ returnItem ~ randomItemNr:", randomItemNr)
        let randomItemNr = itemsM[randomTopicNr].items[randomItemNrIndeks]

      let topicName = topArray[randomTopicNr]
      // console.log("🚀 ~ returnItem ~ topicName:", topicName)

      // Usuń wylosowany numer z tablicy odpowiedniego obiektu należącego do itemsM.
      itemsM = itemsM.map((topic, index) => {
        if (index === randomTopicNr) {
          const updatedItems = topic.items.filter(item => item !== randomItemNrIndeks)
          return { ...topic, items: updatedItems }
        }
        return topic
      })
      

      // Jeśli items jest puste, usuń cały obiekt z itemsM.
      if (itemsM[randomTopicNr].items.length === 0) {
        itemsM.splice(randomTopicNr, 1)
      }
      console.log(
        '🚀 ~ returnItem ~ itemsM[randomTopicNr].items.length:',
        itemsM[randomTopicNr].items.length
      )
      
      // console.log("🚀 ~ returnItem ~ itemsM:", itemsM)

      setItemsMatrix(itemsM)

      //usuń wylosowany numer z yablicy odpowiedniego obiektu należacego do itemsMatrx. Jeśli items jest puste, usuń cały obiekt z itemsMatrix

      return quiz[catName][topicName][randomItemNr]
    }
    
    randomItem = returnItem(itemsMatrix)

    return randomItem
  }

  function countItems(catName, topArray): number {
    let itemsCount = 0

    for (let j = 0; j < topArray.length; j++) {
      let itemsArray: Array<Item> = quiz[catName][topArray[j]]
      itemsCount += itemsArray.length
    }

    return itemsCount
  }

  return { importItem, countItems, importRandomItem }
}

export default useImportItem
