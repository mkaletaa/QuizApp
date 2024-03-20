import { quiz } from '../../data/quiz/quizModule'
import { Item } from './types'
import { topics, chapters } from '../../data/data'
//todo: zamienić ten hook na zbiór util fn
//* UWAGA: można rozważyć włożenie do obiektów items i chapters klucz z ilością topików/itemów żeby przyspieszyć działanie aplikacji

const useQuizData = () => {
  function importItem(
    chap: string,
    top: string,
    whichItem: number
  ): Item | null {
    let item: Item
    item = quiz[chap][top][whichItem] //jeśli item === null już wszystkie itemy z tego topica zostały pobrane
    if (item === undefined || item === null) return null
    return item
  }

  function importItemById(id: string): Item {
    const [chapter, topic] = id.split('|')

    const itemIndex: number = quiz[chapter][topic].findIndex(
      item => item.id === id
    )

    return quiz[chapter][topic][itemIndex]
  }

  function importRandomItemAllItemsMode(chapterName: string): Item {
    let chapNr: number
    let chapName: string

    if (chapterName === '__All__') {
      chapNr = Math.floor(Math.random() * chapters.length)
      chapName = chapters[chapNr].name
    } else chapName = chapterName

    let topNr: number = Math.floor(Math.random() * topics[chapName].length) //można tez użyc funkcji countTopics
    let topName: string = topics[chapName][topNr].name
    let itemNr: number = Math.floor(
      Math.random() * countItemsInTopics(topName, chapName)
    )
    let item: Item = quiz[chapName][topName][itemNr]
    return item
  }

  function countItemsInTopics(topName: string, chapName: string): number {
    let itemsArray: Array<Item> = quiz[chapName][topName]
    return itemsArray.length
  }

  function countTopics(chapName): number {
    return topics[chapName].length
  }

  function getTopicsForChapter(chapName): Array<string> {
    return topics[chapName].map(topic => topic.name)
  }

  function getAllTopics(): string[] {
    let topics: Array<string> = []
    for (const chapName in Object.keys(topics)) {
      topics.push(...getTopicsForChapter(chapName))
    }
    return topics
  }

  return {
    importItem,
    importItemById,
    importRandomItemAllItemsMode,
    countItemsInTopics,
    countTopics,
    getTopicsForChapter,
    getAllTopics,
  }
}

export default useQuizData
