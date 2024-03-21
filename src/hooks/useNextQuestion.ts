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
  const { importItem, importRandomItemAllItemsMode } = useQuizData()
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [showResultModal, setShowResultModal] = useState(false) //pokaż modal z wynikiem jednego pytania
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [showGeneralResults, setShowGeneralResults] = useState(false) //pokaz wyniki wszystkich pytań
  const [randomNrArray, setRandomNrArray] = useState([]) //
  //   const [topicItemsNr, setTopicItemsNr] = useState(0)
  useEffect(() => {
    //tworzenie tablicy losowych niepowtarzajacych się indeksów
    if (shuffle && itemsCount !== Infinity) {
      let arr = []
      let usedNumbers = [] // Tablica przechowująca już użyte liczby

      for (let i = 0; i < itemsCount; i++) {
        let randomNumber

        do {
          randomNumber = Math.floor(Math.random() * itemsCount) // Losowanie liczby
        } while (usedNumbers.includes(randomNumber)) // Sprawdzenie, czy liczba już została użyta

        usedNumbers.push(randomNumber) // Dodanie liczby do tablicy użytych liczb
        arr.push(randomNumber) // Dodanie liczby do głównej tablicy
      }
      console.log('🚀 ~ useEffect ~ arr:', arr)

      if (itemsArray === undefined) getNextRandomItem(arr, 0)
      else getRandomItemFromList(arr, 0)

      setRandomNrArray(arr)
    }
  }, [])

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ randomNrArray:', randomNrArray)
  }, [randomNrArray])

  function getNextRandomItem(array: Array<number>, index: number) {
    console.log('🚀 ~ getNextRandomItem ~ getNextRandomItem:')
    let newItem = importItem(chapName, topName, array[index])
    setItem(newItem)
  }

  //to jak itemsArray jest
  function getRandomItemFromList(array: Array<number>, index: number) {
    console.log('🚀 ~ getNextRandomItem ~ getNextRandomItem:')
    // let newItem = importItem(chapName, topName, array[index])
    let newItem = itemsArray[array[index]]
    setItem(newItem)
  }

  function getNextItem() {
    console.log('🚀 ~ getNextItem ~ getNextItem:')
    let newItem: Item

    if (chapName === '__Saved__') {
      //może zmienić warunek na if itemsArray

      if (shuffle) {
        if (whichItem > 0) {
        } else return
      } else newItem = itemsArray[whichItem]
      // setShowResultModal(false)
      // setChosenOptions([])
    } else {
      if (itemsCount === Infinity) {
        newItem = importRandomItemAllItemsMode(chapName)
      } else if (shuffle) {
        console.log('🚀 ~ getNextItem ~ randomNrArray:', randomNrArray)
        if (whichItem > 0)
          //React jest zjebany. Mimo że getNextItem wykonuje sie po mountingu to randomNrArray nadal jest niezapełnione bo jest kurwa asycnchroniczne
          // getNextRandomItem(randomNrArray, whichItem)
          newItem = importItem(chapName, topName, randomNrArray[whichItem])
        else return
      } else {
        newItem = importItem(chapName, topName, whichItem)
      }
    }

    setShowResultModal(false)
    setChosenOptions([])

    setItem(newItem)
  }

  //uruchamia się po naciśnięciu przycisku w modalu
  function nextBtnPress(): void {
    //   console.log(itemsArray)
    // if allItemsMode. działa tylko po naciśnięciu przycisku Random Question
    if (itemsCount === Infinity) {
      getNextItem()
      return
    }

    if (itemsArray !== undefined) {
      //jeśli już wcześniej przsygotowana lista pytań
      //może zmienić warunek na if itemsArray, wcześniej było if chapName==='__Saved__'

      if (shuffle) {
        //dokończyć
      }

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
