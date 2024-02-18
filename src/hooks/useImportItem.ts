import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'

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

  return importItem
}

export default useImportItem