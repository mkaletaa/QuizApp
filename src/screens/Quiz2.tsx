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
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { quiz } from '../../data/quiz/quizModule' //normalnie tego importu nie powinno być
import ContentRenderer from '../components/ContentRenderer'
import Options from '../components/Options2'
import Question from '../components/Question'
import { Item, Option, Result } from '../utils/types'
import Line from '../components/Line'
import Explanation from '../components/Explanation'
import useImportItem from '../hooks/useImportItem'
import GeneralResults from '../components/GeneralResults'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const topArray: Array<string> = route.params.topArray
  const catName: string = route.params.categoryName
  // const catTopArray: Array<string> = route.params.catTopArray
  const [item, setItem] = useState<Item>()
  const [showResultModal, setShowResultModal] = useState(false) //pokaż modal z wynikiem jednego pytania
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [resultsArray, setResultsArray] = useState<Result[]>([])
  const [showGeneralResults, setShowGeneralResults] = useState(false) //pokaz wyniki wszystkich pytań
  const [allItemsCount, setAllItemsCount] = useState(0)
  // const [allItemsCountArray, setAllItemsCountArray] = useState([0][0][0])

  const { importItem, countItems, importRandomItem } = useImportItem()

  const [whichObject, setWhichObject] = useState({
    whichItem: 0,
    whichTopic: 0,
    // whichCategory: 0,
  })

  useEffect(() => {
    setAllItemsCount(countItems(catName, topArray))
    // console.log('setAllItemsCount', countItems(catName, topArray))

    // console.log('🚀 ~ useEffect ~ allItemsCountHelp:', allItemsCountHelp)
    // setAllItemsCountArray(allItemsCountArray)

    // let importedItem: Item = importItem(
    //   catName,
    //   topArray[whichObject.whichTopic],
    //   whichObject.whichItem
    // )
    // let importedItem = importRandomItem(catName, topArray)
    // console.log("🚀 ~ useEffect ~ importedItem:", importedItem)
    // setItem(importedItem)
  }, [])

  //uruchamia się po naciśnięciu przycisku w modalu
  function nextItem(): void {
    let ileItemowwTopicu =
      quiz[catName][topArray[whichObject.whichTopic]].length

    //jeśli liczba itemów w topicu dobiegła końca
    if (whichObject.whichItem === ileItemowwTopicu - 1) {
      //jeśli iliczba topików w kategorii dobiegła końca
      if (whichObject.whichTopic === topArray.length - 1) {
        setItem(null)
        setTimeout(() => {
          setShowGeneralResults(true)
        }, 0)

        // resultsArray.length === allItemsCount
        setShowResultModal(false)
      }
      //jeśli iliczba topików w kategorii nie dobiegła końca
      else
        setWhichObject(prev => ({
          ...prev,
          whichTopic: prev.whichTopic + 1,
          whichItem: 0,
        }))

      // console.log('2 wewnątrz')

      return
    }

    // console.log(1)
    setWhichObject(prev => ({
      ...prev,
      whichItem: prev.whichItem + 1,
    }))
    // console.log('1 wewnątrz')
  }

  useEffect(() => {
    let item: Item
console.log('dupe')
    
    // item = importItem(
    //   catName,
    //   topArray[whichObject.whichTopic],
    //   whichObject.whichItem
    // )
    item= importRandomItem(catName, topArray)

    // console.log('item: ', item)
    importRandomItem(catName, topArray)
    
    setItem(item)
    setShowResultModal(false)
    setChosenOptions([])
  }, [whichObject])

  function closeModalAndGoBack(): void {
    setShowModal(false)
    navigation.goBack() // powrót do poprzedniego ekranu
  }

  function handleOptionPress(option: Option, whatToDo: 'add' | 'remove'): void {
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
      {item && (
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
        // duration={1000}
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        // onRequestClose={() => setModalVisible(false)}
      >
        <Explanation
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
