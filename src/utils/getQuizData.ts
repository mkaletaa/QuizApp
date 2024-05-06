//* This file contains functions used to retrieve questions from json files

import { quiz } from '../../data/quiz/quizModule'
import { Item } from './types'
import { removeQuestion } from './utilStorage'

export function importItem(
  chap: string,
  top: string,
  whichItem: number
): Item | null {
  let item: Item
  item = quiz[chap][top][whichItem] //if item === null, it means all items from this topic have been retrieved
  if (item === undefined || item === null) return null
  return item
}

/**
    This question is used to retrieve saved questions from JSON databse.
    @param {string} id - id of a saved question
    @return {Item} - Question retrieved from JSON databse 
**/
export function importItemById(id: string): Item {
  const [chapter, topic] = id.split('|')

  if (!quiz[chapter] || !quiz[chapter][topic]) {
    removeQuestion(id) //if the questions doesnt't exist in json database, remove it from the memory
    return null
  }
  const itemIndex: number = quiz[chapter][topic].findIndex(
    item => item.id === id
  )
  if (itemIndex === -1) return null

  return quiz[chapter][topic][itemIndex]
}

//* Note: some topics may have only theory but not the questions. This is why we can't use objects from data.ts
export function importItemInfinityMode(chapterName: string): Item {
  let randomChapNr: number
  let chapName: string

  // jeśli __All__ to znaczy że ma pobierać itemy z całej aplikacji a nie tylko jednego chaptera
  if (chapterName === '__All__') {
    randomChapNr = Math.floor(Math.random() * Object.keys(quiz).length) //Object.keys(quiz).length - ile jest chapterów w obiekcie quiz
    const chaptersArray = Object.keys(quiz) // Pobiera wszystkie klucze obiektu i zapisuje je w tablicy
    chapName = chaptersArray[randomChapNr] // nazwa n-tego klucza będąca jednocześnie nazwą kategorii
  } else chapName = chapterName

  let topNr: number = Math.floor(
    Math.random() * Object.keys(quiz[chapName]).length //Object.keys(quiz[chapName]).length - liczba topików w określonym chapterze obiektu quiz
  )

  const topicsArray = Object.keys(quiz[chapName]) // Pobiera wszystkie klucze chaptera i zapisuje je w tablicy
  let topName: string = topicsArray[topNr]
  let itemNr: number = Math.floor(
    Math.random() * countItemsInTopic(topName, chapName)
  )

  return quiz[chapName][topName][itemNr]
}

export function countItemsInTopic(topName: string, chapName: string): number {
  let itemsArray: Array<Item> = quiz[chapName][topName]
  if (!quiz[chapName] || !quiz[chapName][topName]) return 0
  return itemsArray.length
}

// function countTopics(chapName): number {
//   return topics[chapName].length
// }

// function getTopicsForChapter(chapName): Array<string> {
//   return topics[chapName].map(topic => topic.name)
// }

// function getAllTopics(): string[] {
//   let topics: Array<string> = []
//   for (const chapName in Object.keys(topics)) {
//     topics.push(...getTopicsForChapter(chapName))
//   }
//   return topics
// }
