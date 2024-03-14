import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  BackHandler,
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomModal from '../components/CustomModal'
import Explanation from '../components/Explanation'
import GeneralResults from '../components/GeneralResults'
import Options from '../components/Options'
import Question from '../components/Question'
import Line from '../components/ui/Line'
import useAsyncStorage from '../hooks/useAsyncStorage'
import useQuizData from '../hooks/useQuizData'
import { returnIsCorrect } from '../utils/functions'
import { Item, Option, Result } from '../utils/types'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  // const [showModal, setShowModal] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

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

  const { importItem, countItemsInTopics, importRandomItemAllItemsMode } =
    useQuizData()

  const { storeFinishedQuizStat } = useAsyncStorage()

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

    if (allItemsCount === Infinity) {
      item = importRandomItemAllItemsMode(catName)
    } else if (shuffle) item = null // zmienić
    else item = importItem(catName, topName, whichItem)

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

      setWhichItem(prev => prev + 1)

      return
    }

    if (resultsArray.length === allItemsCount) {
      storeFinishedQuizStat(topName, resultsArray)
      setItem(null)
      setTimeout(() => {
        setShowGeneralResults(true)
      }, 0)

      setShowResultModal(false)
      return
    }

    let topicItemsNr = countItemsInTopics(topName, catName)

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

    setWhichItem(prev => prev + 1)
    // return
  }

  function handleOptionPress(option: Option, whatToDo: 'add' | 'remove'): void {
    //jeśli opcja została zaznaczona i jest multichoice
    if (whatToDo === 'add' && item.multiChoice) {
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
    let thisQuestionResult: 'correct' | 'incorrect' | 'kindof' =
      returnIsCorrect(item, chosenOptions)

    //nie wiem czy to zapisywać
    // storeItemStat(item.id, thisQuestionResult)
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

  function closeModalAndGoBack(): void {
    setShowExitModal(false)
    navigation.goBack() // powrót do poprzedniego ekranu
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    )

    return () => backHandler.remove() // Cleanup the event listener on unmount
  }, [showExitModal, showGeneralResults, navigation])

  const handleBackPress = () => {
    if (showExitModal || showGeneralResults) {
      // If the exit modal or general results are already visible, close them
      setShowExitModal(false)
      setShowGeneralResults(false)
      navigation.goBack() // powrót do poprzedniego ek
    } else {
      // Otherwise, show the exit modal
      setShowExitModal(true)
    }

    // Prevent default behavior of the back button
    return true
  }

  return (
    <SafeAreaView>
      {item && allItemsCount !== Infinity && whichItem !== 0 && (
        <Line resultsArray={resultsArray} allItemsCount={allItemsCount} />
      )}
      <ScrollView
        contentContainerStyle={[
          styles.screen,
          { width: screenWidth, minHeight: screenHeight  }, //height of the pagination is 45
        ]}
      >
        {
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0, 150, 255, 0)',
              borderRadius: 5,
              // elevation: 3,
              paddingVertical: 5,
              paddingHorizontal: 10,
              position: 'absolute',
              left: 20,
              top: 10,
            }}
            onPress={() => handleBackPress()}
          >
            <AntDesign name="arrowleft" size={27} color="black" />
          </TouchableOpacity>
        }
        {/* </Pressable> */}

        {item && (
          <React.Fragment>
            <View style={{ marginTop: 30 }}>
              <Question question={item?.question} />
            </View>
            <Options
              item={item}
              chosenOptions={chosenOptions}
              handleOptionPress={handleOptionPress}
              multiChoice={item.multiChoice}
            />
            <Button
              title="submit"
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
        onRequestClose={() => nextBtnPress()}
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

      <CustomModal
        showModal={showExitModal}
        onRequestClose={() => setShowResultModal(false)}
        modalText={
          "Are you sure you want to go back? Your progress won't be saved"
        }
      >
        <React.Fragment>
          <View style={styles.buttonsContainer}>
            <Button
              title="yes, quit the quiz"
              color="red"
              onPress={closeModalAndGoBack}
            />
            <Button
              title="nah, I want to stay here"
              onPress={() => setShowExitModal(false)}
            />
          </View>
        </React.Fragment>
      </CustomModal>
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
  button: {
    fontSize: 10,
  },
})
