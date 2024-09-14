import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { importItem, importItemInfinityMode } from '../utils/getQuizData'
import { Item, Option, Result } from '../utils/types'
import { setDailyStreak, setFinishedQuizStats } from '../utils/utilStorage'

//* This hook is called inside `Quiz` screen every time when a new question is needed to appear on screen
//TODO: for better performance get Next Item when ResultModal appears on screen, not when it disappears
//TODO: maybe in 'Card' scenario questions should also be passed here in itemsArray
const useNextQuestion = ({
  topName, //equal to '' in all scenarios except 'Card'
  chapName, //equal to '__Saved__' or '__Again__' or '__All__' or anything else in 'Card' scenario
  itemsArray, //prepared list of items (used only when saved or retake - see the scenarios in useOpenQuiz.tsx)
  itemsCount, //number of questions (undefined in 'Card', Infinity in 'RQB')
  shuffle, //always true in RQB (infinity mode) otherwise determined by the settings
}: {
  topName: '' | string
  chapName: '__All__' | '__Again__' | '__Saved__' | string
  itemsArray: Item[]
  itemsCount: number
  shuffle: boolean
}) => {
  const [item, setItem] = useState<Item>(null) //a new Item that is about to be shown on screen
  const [itemIndex, setItemIndex] = useState(0) //this tells how many questions have been already answered. It increments from 0 to itemsCount. Doesn't increment in RQB scenario (infinity mode)
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [showResultModal, setShowResultModal] = useState(false) //show modal with one question result
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [randomNrArray, setRandomNrArray] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    //When every scenario except RQB AND shuffle is enabled
    if (shuffle && itemsCount !== Infinity) {
      let numbers = []

      for (let i = 0; i < itemsCount; i++) numbers.push(i)

      const shuffledNumbers = shuffleArray(numbers)

      //! simulate long loading time
      // setTimeout(() => {
      if (itemsArray === undefined) getFirstRandomItem(shuffledNumbers, 0)
      else getFirstRandomItemFromList(shuffledNumbers, 0)
      // }, 2000)

      setRandomNrArray(shuffledNumbers)
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
    // console.log('-------------')
    // console.log('🚀 ~ shuffle:', shuffle)
    // console.log('🚀 ~ itemsCount:', itemsCount)
    // console.log('🚀 ~ itemsArray:', itemsArray)
    // console.log('🚀 ~ chapName:', chapName)
    // console.log('🚀 ~ topName:', topName)
    // console.log('🚀 ~ itemIndex:', itemIndex)
    // console.log('-------------')

    let newItem: Item
    console.log(item?.id)
    //RQB scenario (InfinityMode)
    if (itemsCount === Infinity) {
      do newItem = importItemInfinityMode(chapName)
      while (item?.id === newItem.id) //prevent two same questions in a row
      prepareForTheNextItem(newItem)
      return
    }

    //React jest zjebany. Mimo że getNextItem wykonuje sie po mountingu to randomNrArray nadal jest niezapełnione bo jest kurwa asycnchroniczne

    if (shuffle && itemIndex === 0) return //without it only loading spinner appears on screen
    //retake or saved scenario
    if (itemsArray && shuffle) newItem = itemsArray[randomNrArray[itemIndex]]

    //retake or saved scenario
    if (itemsArray && !shuffle) newItem = itemsArray[itemIndex]

    //Card scenario
    if (!itemsArray && shuffle)
      newItem = importItem(chapName, topName, randomNrArray[itemIndex])

    //Card scenario
    if (!itemsArray && !shuffle)
      newItem = importItem(chapName, topName, itemIndex)

    prepareForTheNextItem(newItem)
  }

  function prepareForTheNextItem(newItem) {
    setShowResultModal(false)
    setChosenOptions([])
    setItem(null)

    //! symulacja długiego ładowania pytania
    // setTimeout(() => {
    if (newItem?.preventMix === true) setItem(newItem)
    else {
      newItem.options = shuffleArray(newItem.options)
      setItem(newItem)
    }
    // }, 2000)
  }

  //uruchamia się po naciśnięciu przycisku w modalu
  function nextBtnPress(): void {
    // RQB scenario
    if (itemsCount === Infinity) {
      getNextItem()
      return
    }

    //if all questions have been answered
    if (resultsArray.length === itemsCount) {
      //   storeFinishedQuizStat(topName, resultsArray)
      if (
        resultsArray.every(result => result.isCorrect === 'correct') &&
        !chapName.startsWith('__')
      ) {
        // zapisz do async storage //Alert.alert(chapName)
        setFinishedQuizStats(chapName, topName)
      }

      setDailyStreak()
      prepareForGeneralResults()
      return
    }

    //it triggers useEffect in `Quiz` screen and there getNextItem() is called
    setItemIndex(prev => prev + 1)
  }

  function prepareForGeneralResults() {
    setItem(null) //? why?
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('QuizResults', { resultsArray }))
    }, 0)
    setShowResultModal(false)
  }

  return {
    item,
    getNextItem,
    nextBtnPress,
    whichItem: itemIndex,
    showResultModal,
    setShowResultModal,
    chosenOptions,
    setChosenOptions,
    resultsArray,
    setResultsArray,
  }
}

export default useNextQuestion
