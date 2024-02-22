import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContentRenderer from '../components/ContentRenderer'
import Options from '../components/Options'
import Question from '../components/Question'
import { Item, Option, Result } from '../utils/types'
import Line from '../components/Line'
import Explanation from '../components/Explanation'
import useQuizData from '../hooks/useQuizData'
import GeneralResults from '../components/GeneralResults'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const catName: string = route.params.catName 
 const topArray: Array<string> = route.params.topArray
  // let catName: string = route.params.categoryName
  const howManyItems: number = route.params.howManyItems
  const [item, setItem] = useState<Item>()
  const [showResultModal, setShowResultModal] = useState(false) //pokaż modal z wynikiem jednego pytania
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [showGeneralResults, setShowGeneralResults] = useState(false) //pokaz wyniki wszystkich pytań
  const [allItemsCount, setAllItemsCount] = useState(0)

  const {
    importItem,
    countItemsInCategories,
    countItemsInTopics,
    importRandomItem,
    countTopics,
    getTopicsForCategory,
  } = useQuizData()

  const [whichObject, setWhichObject] = useState({
    whichItem: 0,
    whichTopic: 0,
  })

  useEffect(() => {
   setAllItemsCount(howManyItems)
  }, [])


  //uruchamia się po naciśnięciu przycisku w modalu
  function nextItem(): void {
    // return
    if (resultsArray.length === allItemsCount) {
      setItem(null)
      setTimeout(() => {
        setShowGeneralResults(true)
      }, 0)

      setShowResultModal(false)
      return
    }

    let topicItemsNr = countItemsInTopics(
      [topArray[whichObject.whichTopic]],
      catName
    )

    //jeśli liczba itemów w topicu dobiegła końca
    if (whichObject.whichItem === topicItemsNr - 1) {
      //jeśli iliczba topików w kategorii dobiegła końca
      if (whichObject.whichTopic === topArray.length - 1) {

          setItem(null)
          setTimeout(() => {
            setShowGeneralResults(true)
          }, 0)

          setShowResultModal(false)

      }
      //jeśli iliczba topików w kategorii nie dobiegła końca
      else
        setWhichObject(prev => ({

          whichTopic: prev.whichTopic + 1,
          whichItem: 0,
        }))

      return
    }

    // return
    setWhichObject(prev => ({
      ...prev,
      whichItem: prev.whichItem + 1,
    }))
  }


  useEffect(() => {
    // return
    let item: Item

    let random: boolean = false ? true : false //jeśli w opcjach jest zaznaczona opcja shuffle to zawsze true
    if (random)
      item = importRandomItem(catName, topArray)
    else
      item = importItem(
        catName,
        topArray[whichObject.whichTopic],
        whichObject.whichItem
      )

    setItem(item)
    setShowResultModal(false)
    setChosenOptions([])
  }, [whichObject])

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
      let result: Result = {
        id: item.id,
        item: item,
        isCorrect: thisQuestionResult,
        userChoices: chosenOptions,
      }

      setResultsArray(prev => [...prev, result])
  
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
      {item && allItemsCount!==Infinity && (
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
              onPress={() => setResults()}
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
      >
        
        <Explanation
          showQuestion={false}
          item={item}
          chosenOptions={chosenOptions}
          nextItem={nextItem}
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
