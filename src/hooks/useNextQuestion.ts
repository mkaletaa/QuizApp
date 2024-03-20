import React, { useState } from 'react'
import { Item, Option, Result } from '../utils/types'
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
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [showGeneralResults, setShowGeneralResults] = useState(false) //pokaz wyniki wszystkich pytań

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

  //uruchamia się po naciśnięciu przycisku w modalu
  function nextBtnPress(): void {
    // if allItemsMode
    if (itemsCount === Infinity) {
      getNextItem()
      return
    }

    if (chapName === '__Saved__') {
      //tutaj sprawdzić czy Infinity
      if (whichItem === itemsCount - 1) {
        //redundancja
        setItem(null)
        setTimeout(() => {
          setShowGeneralResults(true)
        }, 0)

        setShowResultModal(false)
        return
      }

      setWhichItem(prev => prev + 1)

      return
    }

    if (resultsArray.length === itemsCount) {
    //   storeFinishedQuizStat(topName, resultsArray)
      setItem(null)
      setTimeout(() => {
        setShowGeneralResults(true)
      }, 0)

      setShowResultModal(false)
      return
    }

    let topicItemsNr = countItemsInTopics(topName, chapName)

    //jeśli liczba itemów w topicu dobiegła końca
    if (
      whichItem === topicItemsNr - 1 &&
      itemsCount !== Infinity //tego w zasadzie nie musze pisać
    ) {
      setItem(null)
      setTimeout(() => {
        setShowGeneralResults(true)
      }, 0)

      setShowResultModal(false)

      return
    }

    setWhichItem(prev => prev + 1)
    // return
  }

  return {
    item,
    setItem,
    getNextItem,
    nextBtnPress,
    whichItem,
    setWhichItem,
    showResultModal,
    setShowResultModal,
    chosenOptions,
    setChosenOptions,
    resultsArray,
    setResultsArray,
    showGeneralResults,
    setShowGeneralResults,
  }
}

export default useNextQuestion
