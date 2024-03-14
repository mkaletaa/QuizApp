import { quiz } from '../../data/quiz/quizModule'
import { Item } from '../utils/types'
import { topics, categories } from '../../data/data'

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

    const itemIndex: number = quiz[category][topic].findIndex(
      item => item.id === id
    )

    return quiz[category][topic][itemIndex]
  }

  function importRandomItemAllItemsMode(categoryName: string): Item {
    let catNr: number
    let catName: string

    if (categoryName === '__All__') {
      catNr = Math.floor(Math.random() * categories.length)
      catName = categories[catNr].name
    } else
      catName = categoryName
    

    let topNr: number = Math.floor(Math.random() * topics[catName].length) //można tez użyc funkcji countTopics
    let topName: string = topics[catName][topNr].name
    let itemNr: number = Math.floor(
      Math.random() * countItemsInTopics(topName, catName)
    )
    let item: Item = quiz[catName][topName][itemNr]
    return item
  }


  function countItemsInTopics(topName: string, catName: string): number {
    let itemsArray: Array<Item> = quiz[catName][topName]
    return itemsArray.length
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
    importItemById,
    importRandomItemAllItemsMode,
    countItemsInTopics,
    countTopics,
    getTopicsForCategory,
    getAllTopics,
  }
}

export default useQuizData
