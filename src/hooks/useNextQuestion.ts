import React, { useState } from 'react'
import { Item, Option } from '../utils/types'
import useQuizData from '../utils/useQuizData'

const useNextQuestion = ({
  chapName,
  topName,
  itemsArray,
  itemsCount,
  shuffle,
}: {
  chapName: string
  topName: string
  itemsArray: Item[]
  itemsCount: number,
  shuffle: boolean
}) => {
  const [item, setItem] = useState<Item>()
  const [whichItem, setWhichItem] = useState(0)
  const { importItem, countItemsInTopics, importRandomItemAllItemsMode } =
    useQuizData()
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [showResultModal, setShowResultModal] = useState(false) //pokaż modal z wynikiem jednego pytania

  function getNextItem() {
    let newItem: Item

    if (chapName === '__Saved__') {
      //* tu jeszcze sprawdzenie czy infinityMode

      newItem = itemsArray[whichItem]
      setShowResultModal(false)
      setChosenOptions([])
    } else {
      if (itemsCount === Infinity) {
        newItem = importRandomItemAllItemsMode(chapName)
      } else if (shuffle) {
        // zmienić
        newItem = null
      } else {
        newItem = importItem(chapName, topName, whichItem)
      }

      setShowResultModal(false)
      setChosenOptions([])
    }

    setItem(newItem)
  }

  return { item, setItem, getNextItem, whichItem, setWhichItem, showResultModal, setShowResultModal, chosenOptions, setChosenOptions };
}

export default useNextQuestion
