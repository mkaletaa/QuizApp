import { useEffect, useState } from 'react'
import { Item, Option, Result } from '../utils/types'
// import useQuizData from '../utils/useQuizData'
import { useNavigation } from '@react-navigation/native'

import { importItem, importItemInfinityMode } from '../utils/getQuizData'
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
  const [item, setItem] = useState<Item>(null)
  const [whichItem, setWhichItem] = useState(0)
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [showResultModal, setShowResultModal] = useState(false) //pokaż modal z wynikiem jednego pytania
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  // const [showGeneralResults, setShowGeneralResults] = useState(false) //pokaz wyniki wszystkich pytań
  const [randomNrArray, setRandomNrArray] = useState([]) //
  //* zapisane pytania mają chapName ==='__Saved__'
  const navigation = useNavigation()
  useEffect(() => {
    console.log('🚀 ~ useNextQuestion ~ useEffect:', itemsCount)
    // let n = countItemsInTopics(topName, chapName)

    if (shuffle && itemsCount !== Infinity) {
      let arr = []
      let usedNumbers = [] // Tablica przechowująca już użyte liczby

      //tworzenie tablicy losowych niepowtarzajacych się indeksów
      for (let i = 0; i < itemsCount; i++) {
        let randomNumber

        do {
          randomNumber = Math.floor(Math.random() * itemsCount) // Losowanie liczby
        } while (usedNumbers.includes(randomNumber)) // Sprawdzenie, czy liczba już została użyta

        usedNumbers.push(randomNumber) // Dodanie liczby do tablicy użytych liczb
        arr.push(randomNumber) // Dodanie liczby do głównej tablicy
      }

      //! symulacja długiego ładowania pytania
      // setTimeout(() => {
      if (itemsArray === undefined) getFirstRandomItem(arr, 0)
      else getFirstRandomItemFromList(arr, 0)
      // }, 2000)

      setRandomNrArray(arr)
    }
    console.log('itemsArray: ', !itemsArray)
  }, [])

  //jak nie ma itemsArray
  function getFirstRandomItem(array: Array<number>, index: number) {
    let newItem = importItem(chapName, topName, array[index])
    setItem(newItem)
  }

  //to jak jest itemsArray
  function getFirstRandomItemFromList(array: Array<number>, index: number) {
    let newItem = itemsArray[array[index]]
    setItem(newItem)
  }

  function getNextItem() {
    let newItem: Item
    console.log('🚀 ~ useNextItem:')

    //być może można dać tutaj if (shuffle && whichItem === 0) return
    if (itemsCount === Infinity) {
      newItem = importItemInfinityMode(chapName)
      prepareForTheNextItem(newItem)
      return
    }

    //React jest zjebany. Mimo że getNextItem wykonuje sie po mountingu to randomNrArray nadal jest niezapełnione bo jest kurwa asycnchroniczne
    if (shuffle && whichItem === 0) return

    if (itemsArray && shuffle) {
      newItem = itemsArray[randomNrArray[whichItem]]
      // prepareForTheNextItem(newItem)
      // return
    }

    if (itemsArray && !shuffle) {
      newItem = itemsArray[whichItem]
      // prepareForTheNextItem(newItem)
      // return
    }

    if (!itemsArray && shuffle) {
      console.log('🚀 ~ getNextItem ~ randomNrArray:', randomNrArray)
      // getNextRandomItem(randomNrArray, whichItem)
      newItem = importItem(chapName, topName, randomNrArray[whichItem])
    }

    if (!itemsArray && !shuffle)
      newItem = importItem(chapName, topName, whichItem)

    prepareForTheNextItem(newItem)
  }

  function prepareForTheNextItem(newItem) {
    setShowResultModal(false)
    setChosenOptions([])
    setItem(null)

    //! symulacja długiego ładowania pytania
    // setTimeout(() => {
    setItem(newItem)
    // }, 2000)
  }

  //uruchamia się po naciśnięciu przycisku w modalu
  function nextBtnPress(): void {
    // if allItemsMode. działa tylko po naciśnięciu przycisku Random Question
    if (itemsCount === Infinity) {
      getNextItem()
      return
    }

    //jeśli już wszystkie itemy zostały wykorzystane
    if (resultsArray.length === itemsCount) {
      //   storeFinishedQuizStat(topName, resultsArray)
      prepareForGeneralResults()
      return
    }

    //setWhichItem truggeruje useEffect w Quizie, a tam wywoływany jest getNextItem()
    setWhichItem(prev => prev + 1)
  }

  function prepareForGeneralResults() {
    setItem(null)
    setTimeout(() => {
      // setShowGeneralResults(true)
      
      navigation.navigate("QuizResults", {resultsArray})
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
    // showGeneralResults,
    // setShowGeneralResults,
  }
}

export default useNextQuestion
