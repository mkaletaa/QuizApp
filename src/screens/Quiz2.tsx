import React, { useEffect, useState } from 'react'
// import React from 'react'
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
import { quiz } from '../../data/quiz/quizModule'
import ContentRenderer from '../components/ContentRenderer'
import Options from '../components/Options2'
import Question from '../components/Question'
import { Item, Option, Result } from '../utils/types'
import Line from '../components/Line'
import Explanation from '../components/Explanation'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()
  const topArray: Array<string> = route.params.topArray
  const catArray: Array<string> = route.params.catArray
  const [item, setItem] = useState<Item>()
  const [showResultModal, setShowResultModal] = useState(false)
  const [chosenOptions, setChosenOptions] = useState<Option[]>([]) //tablica id wybranych opcji
  const [resultsArray, setResultsArray] = useState<Result[]>([])

  let whichCat: number = 0
  let whichTop: number = 0

  const [allItemsCount, setAllItemsCount] = useState(0)
  const [whichItem, setWhichItem] = useState(0)

  useEffect(() => {
    if(chosenOptions.length>0)
    setChosenOptions([])
    console.log('🚀 ~ Quiz ~ chosenOptions:', chosenOptions)
    for (let i = 0; i < catArray.length; i++) {
      // console.log('first')
      for (let j = 0; j < topArray.length; j++) {
        let itemsArray: Array<Item> = quiz[catArray[i]][topArray[j]]
        setAllItemsCount(prev => prev + itemsArray.length)
      }
    }

    // console.log('🚀 ~ Quiz ~ allItemsCount:', allItemsCount)
    let importedItem: Item = importItem(
      catArray[whichCat],
      topArray[whichTop],
      whichItem
    )
    if (importedItem !== null) setItem(importedItem)


        // return () => {
        //   // Tutaj możesz umieścić kod, który ma zostać wykonany po odmontowaniu komponentu
        //   console.log('Komponent został odmontowany')
        //   setChosenOptions([])
        // }
  }, [])

  function importItem(
    cat: string,
    top: string,
    whichItem: number
  ): Item | null {
    let item: Item = quiz[cat][top][whichItem]
    return item
  }

  function closeModalAndGoBack(): void {
    setShowModal(false)
    navigation.goBack() // powrót do poprzedniego ekranu
  }

  //uruchamia się po naciśnięciu przycisku w modalu
  function nextItem(): void {
    setWhichItem(prev => prev + 1)
  }

  useEffect(() => {
    setItem(importItem(catArray[whichCat], topArray[whichTop], whichItem))
    setShowResultModal(false)
    setChosenOptions([])
  }, [whichItem])

  useEffect(() => {
    // console.log('🚀 ~ Quiz ~ chosenOptions:', chosenOptions)
  }, [chosenOptions])

  function handleOptionPress(option: Option) {
    console.log('🚀 ~ handleOptionPress ~ option:', chosenOptions)
    //jeśli opcja została zaznaczona i jest multichoice
    if (option.isMarked && item.multiChoice) {
      setChosenOptions(prev => [...prev, option])
      return
    }

    //jeśli opcja została zaznaczona i nie jest multichoice
    if (option.isMarked && !item.multiChoice) {
      setChosenOptions([option]) 
      return
    } 
    
    //jeśli opcja została odznaczona 
    if(!option.isMarked){
      //stworzyć nową tablicę na podstawie starej tylko nie zawierającej option
      let chosenOptions2= chosenOptions.filter(id => id !== option)
      setChosenOptions(chosenOptions2)
    }
  }

  function setResults() {
    //activated after pressing zatwierdź button
    let thisQuestionResult: 'correct' | 'incorrect' | 'kindof' = checkTheResult(
      item,
      chosenOptions
    )
    // console.log('🚀 ~ setResults ~ thisQuestionResult:', thisQuestionResult)
    let result: Result = {
      id: item.id,
      item: item,
      isCorrect: thisQuestionResult,
    }
    setResultsArray(prev => [...prev, result])
    // console.log('🚀 ~ setResults ~ item:', item.id)
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
    // console.log('🚀 ~ Quiz ~ chosenOptions:', chosenOptions)

    let nrOfCorrectUserOptions = 0
    let nrOfCorrectOptions = 0

    for (const chosenOption of chosenOptions) {
      if (chosenOption?.correct) nrOfCorrectUserOptions++
    }
    // console.log('🚀 ~ Quiz ~ nrOfCorrectUserOptions:', nrOfCorrectUserOptions)

    if (nrOfCorrectUserOptions === 0) return 'incorrect'

    for (const option of item.options) {
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
            {chosenOptions.map((option, index) =>(
              <Text>{option.answer}, {option.isMarked}</Text>
            ))}
            <Options
              item={item}
              // createResultsArray={() => {}}
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

        {!item &&
          resultsArray.map((result, index) => (
            <View
              style={[
                {
                  backgroundColor:
                    result.isCorrect === 'correct' ? 'green' : 'red',
                  width: screenWidth,
                  height: 20,
                },
              ]}
            >
              {/* <ContentRenderer content={result.item.question}></ContentRenderer> */}
            </View>
          ))}
      </ScrollView>

      <Modal
        // duration={1000}
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        // onRequestClose={() => setModalVisible(false)}
      >
        <Explanation item={item} nextItem={nextItem} />
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
