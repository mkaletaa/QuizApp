import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'
import { topics } from '../../data/data'


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

  function countItems(catName, topArray): number {
    let itemsCount = 0

    // if (catArray.length === 0) {
      for (let j = 0; j < topArray.length; j++) {
        let itemsArray: Array<Item> = quiz[catName][topArray[j]]
        itemsCount += itemsArray.length
      }
    // } else { //jeśli user wybrał quiz ze wszystkich kategorii
    //   for (let i = 0; i < catArray.length; i++) {
    //     for (let j = 0; j < topics[catArray][i]; j++) {
    //       let itemsArray: Array<Item> = quiz[catArray[i]][topArray[j]]
    //       itemsCount += itemsArray.length
    //     }
    //   }
    // }

    return itemsCount
  }

  return { importItem, countItems }
}

export default useImportItem
