import React, { useEffect, useState } from 'react'
import { Item, Option, Result } from '../utils/types'
import useQuizData from '../utils/useQuizData'

const useNextQuestion = ({
  chapName, 
  topName,
  itemsArray, //prepared list of items (currently used only when saved items)
  itemsCount, //number of questions 
  shuffle,
}: {
  chapName: string
  topName: string
  itemsArray: Item[]
  itemsCount: number
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
//   const [topicItemsNr, setTopicItemsNr] = useState(0)
//   useEffect(() => {
//     if(!itemsArray && itemsCount!==Infinity)
//     setTopicItemsNr(countItemsInTopics(topName, chapName))
//   }, [])

  function getNextItem() {
    let newItem: Item

    if (chapName === '__Saved__') {
      //może zmienić warunek na if itemsArray
      //* tu jeszcze sprawdzenie czy shuffleMode

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
      //może zmienić warunek na if itemsArray
      //tutaj sprawdzić czy Infinity
      if (whichItem === itemsCount - 1) {
        redundancyKiller()

        return
      }

      setWhichItem(prev => prev + 1)

      return
    }

    //jeśli już wszystkie itemy zostały odpowiedziane
    if (resultsArray.length === itemsCount) {
      //   storeFinishedQuizStat(topName, resultsArray)
      redundancyKiller()

      return
    }

    setWhichItem(prev => prev + 1)
  }

  function redundancyKiller() {
    setItem(null)
    setTimeout(() => {
      setShowGeneralResults(true)
    }, 0)

    setShowResultModal(false)
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
