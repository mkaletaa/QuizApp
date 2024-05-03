import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  BackHandler,
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContentRenderer from '../components/ContentRenderer/_ContentRenderer'
import CustomModal from '../components/CustomModal'
import ItemResult from '../components/ItemResult'
import GeneralResults from '../components/GeneralResults'
import Options from '../components/Options'
import Line from '../components/ui/Line'
import useNextQuestion from '../hooks/useNextQuestion'
import { returnIsCorrect } from '../utils/functions'
import { Option, Result } from '../utils/types'
// import useQuizData from '../utils/useQuizData'
import { countItemsInTopic } from '../utils/getQuizData'
import {
  yesQuit,
  nah,
  areYouSure,
  submit,
  nextQuestion,
  summary,
} from '../../data/texts'
import useStore from '../utils/store'
import { Button as PaperButton, TouchableRipple } from 'react-native-paper'
import { buttonDark, spinner } from '../utils/constants'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [showExitModal, setShowExitModal] = useState(false)
  // const { countItemsInTopic } = useQuizData()

  const navigation = useNavigation()
  const [itemsCount, setItemsCount] = useState<number>(
    route.params.howManyItems
      ? route.params.howManyItems
      : countItemsInTopic(route.params.topName, route.params.chapName)
  )

  const {
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
  } = useNextQuestion({
    chapName: route.params.chapName,
    topName: route.params.topName,
    itemsArray: route.params.itemsArray,
    itemsCount,
    shuffle: route.params.shuffle,
  })

  // useEffect(() => {
  //       return () => {
  //         const clearImages = useStore.getState().clearImages // Pobierz funkcję clearImages ze stanu
  //         clearImages() // Wywołaj funkcję clearImages przy opuszczaniu ekranu
  //       }
  // }, []);
  //for some reason this useEffect runs right after mounting
  //it also is triggered after next Btn press, because it is updated there
  useEffect(() => {
    getNextItem() // pobranie pierwszego itema
  }, [whichItem])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    )

    return () => backHandler.remove() // Cleanup the event listener on unmount
  }, [showExitModal, showGeneralResults, navigation])

  function handleOptionPress(option: Option, action: 'add' | 'remove'): void {
    //jeśli opcja została zaznaczona i jest multichoice
    if (action === 'add' && item.multiChoice) {
      setChosenOptions(prev => [...prev, option])
      return
    }

    //jeśli opcja została zaznaczona i nie jest multichoice
    if (action === 'add' && !item.multiChoice) {
      setChosenOptions([option])
      return
    }

    //jeśli opcja została odznaczona
    if (action === 'remove') {
      let chosenOptions2 = chosenOptions.filter(el => el.id !== option.id)
      setChosenOptions(chosenOptions2)
    }
  }

  //activated after pressing zatwierdź button
  function setResults() {
    let thisQuestionResult: 'correct' | 'incorrect' | 'kindof' =
      returnIsCorrect(item, chosenOptions)

    let result: Result
    if (itemsCount !== Infinity) {
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
  // StatusBar.setHidden(false)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    if (showResultModal === false)
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false })
  }, [showResultModal])

  return (
    <SafeAreaView>
      {item && itemsCount !== Infinity && whichItem !== 0 && (
        <Line resultsArray={resultsArray} allItemsCount={itemsCount} />
      )}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.screen,
          {
            width: screenWidth,
            minHeight: screenHeight - StatusBar.currentHeight,
          },
        ]}
      >
        {
          <TouchableRipple
          borderless
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              position: 'absolute',
              left: 20,
              top: 15,
            }}
            onPress={() => handleBackPress()}
          >
            <AntDesign name="arrowleft" size={27} color="black" />
          </TouchableRipple>
        }

        {item && (
          <React.Fragment>
            <View style={{ marginTop: 50, width: '90%' }}>
              {/* <Question question={item?.question} /> */}
              <ContentRenderer content={item?.question} />
            </View>
            <Options
              item={item}
              chosenOptions={chosenOptions}
              handleOptionPress={handleOptionPress}
              multiChoice={item.multiChoice}
            />


            <PaperButton
              mode="contained"
              onPress={() => {
                setResults()
              }}
              disabled={chosenOptions.length === 0}
              elevation={5}
              buttonColor={buttonDark}
            >
              {submit}
            </PaperButton>

            {/* <Button
              title={submit}
              onPress={() => {
                setResults()
              }} //jak Infinity mode to nie ustawiaj rezultów
              disabled={chosenOptions.length === 0}
            /> */}
          </React.Fragment>
        )}

        {!item && !showGeneralResults && (
          <ActivityIndicator size={50} color={spinner} />
        )}

        {showGeneralResults && <GeneralResults resultsArray={resultsArray} />}

        {/* <View style={{height: 100, width: 100, backgroundColor: 'red'}}></View> */}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        onRequestClose={() => nextBtnPress()}
        // statusBarTranslucent={true}
      >
        <ItemResult
          // showQuestion={false}
          item={item}
          chosenOptions={chosenOptions}
          handleBtnPress={nextBtnPress}
          btnTitle={resultsArray.length === itemsCount ? summary : nextQuestion}
        />
      </Modal>

      <CustomModal
        showModal={showExitModal}
        onRequestClose={() => setShowResultModal(false)}
        modalText={areYouSure}
      >
        <React.Fragment>
          <View style={styles.buttonsContainer}>
            <Button title={yesQuit} color="red" onPress={closeModalAndGoBack} />
            <Button title={nah} onPress={() => setShowExitModal(false)} />
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
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
})
