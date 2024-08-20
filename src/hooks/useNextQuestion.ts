import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { importItem, importItemInfinityMode } from '../utils/getQuizData'
import { Item, Option, Result } from '../utils/types'
import { setDailyStreak, setFinishedQuizStats } from '../utils/utilStorage'

const useNextQuestion = ({
  chapName,
  topName,
  itemsArray, //prepared list of items (used only when saved items or retake)
  itemsCount, //number of questions (used only when saved items or retake)
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
  const [showResultModal, setShowResultModal] = useState(false) //show modal with one question result
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [randomNrArray, setRandomNrArray] = useState([])

  //* saved questions have chapName ==='__Saved__', and retaken have __Again__
  const navigation = useNavigation()

  useEffect(() => {
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
  }, [])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  //jak nie ma itemsArray i jest shuffle
  function getFirstRandomItem(array: Array<number>, index: number) {
    let newItem = importItem(chapName, topName, array[index])
    setItem(newItem)
  }

  //to jak jest itemsArray i jest shuffle
  function getFirstRandomItemFromList(array: Array<number>, index: number) {
    let newItem = itemsArray[array[index]]
    setItem(newItem)
  }

  function getNextItem() {
    let newItem: Item

    //być może można dać tutaj if (shuffle && whichItem === 0) return

    //InfinityMode
    if (itemsCount === Infinity) {
      newItem = importItemInfinityMode(chapName)
      prepareForTheNextItem(newItem)
      return
    }

    //React jest zjebany. Mimo że getNextItem wykonuje sie po mountingu to randomNrArray nadal jest niezapełnione bo jest kurwa asycnchroniczne
    //?po co w zasadzie jest to?
    if (shuffle && whichItem === 0) return

    //retake or saved
    if (itemsArray && shuffle) {
      newItem = itemsArray[randomNrArray[whichItem]]
      // prepareForTheNextItem(newItem)
      // return
    }

    //retake or saved
    if (itemsArray && !shuffle) {
      newItem = itemsArray[whichItem]
      // prepareForTheNextItem(newItem)
      // return
    }

    //Card/Theory
    if (!itemsArray && shuffle) {
      // console.log('🚀 ~ getNextItem ~ randomNrArray:', randomNrArray)
      // getNextRandomItem(randomNrArray, whichItem)
      newItem = importItem(chapName, topName, randomNrArray[whichItem])
    }

    //Card/Theory
    if (!itemsArray && !shuffle)
      newItem = importItem(chapName, topName, whichItem)
    // newItem.options = shuffleArray(newItem.options)
    // console.log("🚀 ~ getFirstRandomItem ~ newItem:", JSON.stringify(newItem.options))

    prepareForTheNextItem(newItem)
  }

  function prepareForTheNextItem(newItem) {
    setShowResultModal(false)
    setChosenOptions([])
    setItem(null)

    //! symulacja długiego ładowania pytania
    // setTimeout(() => {
    if (newItem?.mix === true) newItem.options = shuffleArray(newItem.options)
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
      if (
        resultsArray.every(result => result.isCorrect === 'correct') &&
        !chapName.startsWith('__')
      ) {
        // todo: zapisz do async storage //Alert.alert(chapName)
        setFinishedQuizStats(chapName, topName)
      }

      setDailyStreak()
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
      //todo: co gdyby tutaj dać normalne navigate a w openQuiz tylko replace
      navigation.dispatch(StackActions.replace('QuizResults', { resultsArray }))
      // navigation.navigate("QuizResults", {resultsArray})
    }, 0)
    setShowResultModal(false)
  }

  return {
    item,
    getNextItem,
    nextBtnPress,
    whichItem,
    showResultModal,
    setShowResultModal,
    chosenOptions,
    setChosenOptions,
    resultsArray,
    setResultsArray,
  }
}

export default useNextQuestion
