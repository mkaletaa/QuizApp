import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, Modal, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Explanation from '../components/Explanation'
import GeneralResults from '../components/GeneralResults'
import Options from '../components/Options'
import Question from '../components/Question'
import Line from '../components/ui/Line'
import useQuizData from '../hooks/useQuizData'
import { Item, Option, Result } from '../utils/types'
import useAsyncStorage from '../hooks/useAsyncStorage'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const catName: string = route.params.catName
  const topName: string = route.params.topName
  const itemsArray: Array<Item> = route.params.itemsArray
  const howManyItems: number = route.params.howManyItems
  const shuffle: boolean = route.params.shuffle
  const [item, setItem] = useState<Item>()
  const [showResultModal, setShowResultModal] = useState(false) //pokaż modal z wynikiem jednego pytania
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [showGeneralResults, setShowGeneralResults] = useState(false) //pokaz wyniki wszystkich pytań
  const [allItemsCount, setAllItemsCount] = useState<number>(howManyItems)
  // const [itemsToShow, setItemsToShow] = useState<Item[]>()

  const {
    importItem,
    countItemsInTopics,
    importRandomItem,
    importRandomItemAllItemsMode,
  } = useQuizData()

  const { storeStat, storeFinishedQuizStat } = useAsyncStorage()

  const [whichItem, setWhichItem] = useState(0)

  //for some reason this useEffect runs right after mounting
  //it also is triggered after next Btn press, because it is updated there
  useEffect(() => {
    getNextItem()
  }, [whichItem])

  function getNextItem() {
    let item: Item
    if (catName === '__Saved__') {
      //* tu jeszcze sprawdzenie czy infinityMode
      
      setItem(itemsArray[whichItem])
      // return
      setShowResultModal(false)
      setChosenOptions([])
      return
    }
    console.log('getNextItem')
    console.log("🚀 ~ getNextItem ~ allItemsCount:", allItemsCount)

    if (allItemsCount === Infinity) {
      item = importRandomItemAllItemsMode(catName)
   
    } else if (shuffle) item = importRandomItem(catName, topName)
    else
      item = importItem(
        catName,
        topName,
        whichItem
      )

    setItem(item)
    setShowResultModal(false)
    setChosenOptions([])
  }


  //uruchamia się po naciśnięciu przycisku w modalu
  function nextBtnPress(): void {
    // if allItemsMode
    if (allItemsCount === Infinity) {
      getNextItem()
      return
    }

    if (catName === '__Saved__') {
      //tutaj sprawdzić czy Infinity
      if (whichItem === allItemsCount - 1) {
        //redundancja
        setItem(null)
        setTimeout(() => {
          setShowGeneralResults(true)
        }, 0)

        setShowResultModal(false)
        return
      }

      setWhichItem(prev => prev+1)

      return
    }



    if (resultsArray.length === allItemsCount) {
      setItem(null)
      setTimeout(() => {
        setShowGeneralResults(true)
      }, 0)

      setShowResultModal(false)
      return
    }

    let topicItemsNr = countItemsInTopics(
      topName,
      catName
    )

    //jeśli liczba itemów w topicu dobiegła końca
    if (
      whichItem === topicItemsNr - 1 &&
      allItemsCount !== Infinity //tego w zasadzie nie musze pisać
    ) {

        setItem(null)
        setTimeout(() => {
          setShowGeneralResults(true)
        }, 0)

        setShowResultModal(false)

      return
    }

    setWhichItem(prev=>prev+1)
    // return

  }

  function closeModalAndGoBack(): void {
    setShowModal(false)
    navigation.goBack() // powrót do poprzedniego ekranu
  }

  function handleOptionPress(option: Option, whatToDo: 'add' | 'remove'): void {
    // return
    //jeśli opcja została zaznaczona i jest multichoice
    if (whatToDo === 'add' && item.multiChoice) {
      // console.log('1')
      setChosenOptions(prev => [...prev, option])
      return
    }

    //jeśli opcja została zaznaczona i nie jest multichoice
    if (whatToDo === 'add' && !item.multiChoice) {
      setChosenOptions([option])
      return
    }

    //jeśli opcja została odznaczona
    if (whatToDo === 'remove') {
      let chosenOptions2 = chosenOptions.filter(el => el.id !== option.id)
      setChosenOptions(chosenOptions2)
    }
  }

  //activated after pressing zatwierdź button
  function setResults() {
    let thisQuestionResult: 'correct' | 'incorrect' | 'kindof' = checkTheResult(
      item,
      chosenOptions
    )

    storeStat(item.id, thisQuestionResult)
    console.log(
      '🚀 ~ setResults ~ item.id, thisQuestionResult:',
      item.id,
      thisQuestionResult
    )

    let result: Result
    if (allItemsCount !== Infinity) {
      result = {
        id: item.id,
        item: item,
        isCorrect: thisQuestionResult,
        userChoices: chosenOptions,
      }
      setResultsArray(prev => [...prev, result])
    }

    setShowResultModal(true)
  }

  //sprawdza czy na to pytanie udzielono dobrej(dobrych) odpowiedzi
  function checkTheResult(
    item: Item,
    chosenOptions: Option[]
  ): 'correct' | 'incorrect' | 'kindof' {
    //zwróć incorrect jeśli żaden element tablicy itemUserChoices nie ma właściwości correct: true
    //zwróć correct jeśli wszystkie elementy tablicy itemUserChoices mają właściwość correct: true i jest ich dokładnie tyle ile elementów tablicy itemUserChoices ma właściwość correct: true
    //zwróć w każdym innym przypadku
    // return
    let nrOfCorrectUserOptions = 0
    let nrOfCorrectOptions = 0

    for (const chosenOption of chosenOptions) {
      if (chosenOption?.correct) nrOfCorrectUserOptions++
    }

    if (nrOfCorrectUserOptions === 0) return 'incorrect'

    for (const option of item?.options) {
      if (option.correct) nrOfCorrectOptions++
    }

    if (
      nrOfCorrectUserOptions === nrOfCorrectOptions &&
      nrOfCorrectOptions === chosenOptions.length
    )
      return 'correct'

    return 'kindof'
  }

  return (
    <SafeAreaView>
      {item && allItemsCount !== Infinity && (
        <Line resultsArray={resultsArray} allItemsCount={allItemsCount} />
      )}

      <ScrollView
        contentContainerStyle={[
          styles.screen,
          { width: screenWidth, minHeight: screenHeight - 25 }, //height of the pagination is 45
        ]}
      >
        {item && (
          <React.Fragment>
            <Question question={item?.question} />
            <Options
              item={item}
              chosenOptions={chosenOptions}
              handleOptionPress={handleOptionPress}
              multiChoice={item.multiChoice}
            />
            <Button
              title="zatwierdź"
              onPress={() => {
                setResults()
              }} //jak Infinity mode to nie ustawiaj rezultów
              disabled={chosenOptions.length === 0}
            />
          </React.Fragment>
        )}

        {showGeneralResults && <GeneralResults resultsArray={resultsArray} />}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        onRequestClose={() => setShowResultModal(false)}
      >
        <Explanation
          showQuestion={false}
          item={item}
          chosenOptions={chosenOptions}
          handleBtnPress={nextBtnPress}
          btnTitle={
            resultsArray.length === allItemsCount ? 'summary' : 'next question'
          }
        />
      </Modal>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={false} //showModal
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}
            >
              Are you sure you want to go back? Your progress won't be saved
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                title="yes, quit the quiz"
                color="red"
                onPress={closeModalAndGoBack}
              />
              <Button
                title="nah, I want to stay here"
                onPress={() => setShowModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'lightgray',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  button: {
    fontSize: 10,
  },
})
