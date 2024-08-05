import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button as PaperButton, TouchableRipple } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  areYouSure,
  nah,
  nextQuestion,
  showOptions,
  submit,
  summary,
  yesQuit,
} from '../../data/texts'
import ContentRenderer from '../components/ContentRenderer/_ContentRenderer'
import CustomModal from '../components/CustomModal'
import ItemResult from '../components/ItemResult'
import Options from '../components/Options'
import Line from '../components/molecules/atoms/Line'
import useNextQuestion from '../hooks/useNextQuestion'
import { buttonDark, screenBackground, spinner } from '../utils/constants'
import { returnIsCorrect } from '../utils/functions'
import { countItemsInTopic } from '../utils/getQuizData'
import { Option, Result } from '../utils/types'
import { getValue } from '../utils/utilStorage'

//list of route params is in useOpenQuiz
export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const [showExitModal, setShowExitModal] = useState(false)

  const navigation = useNavigation()
  const [itemsCount, setItemsCount] = useState<number>(
    route.params.howManyItems
      ? route.params.howManyItems
      : countItemsInTopic(route.params.topName, route.params.chapName)
  )

  const {
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
  } = useNextQuestion({
    chapName: route.params.chapName,
    topName: route.params.topName,
    itemsArray: route.params.itemsArray,
    itemsCount,
    shuffle: route.params.shuffle,
  })

  //for some reason this useEffect runs right after mounting
  //it also is triggered after next Btn press, because it is updated there
  useEffect(() => {
    getNextItem() // pobranie pierwszego itema
  }, [whichItem])

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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    )
    return () => backHandler.remove() // Cleanup the event listener on unmount
  }, [])

  const handleBackPress = () => {
    if (showExitModal) {
      // If the exit modal or general results are already visible, close them
      setShowExitModal(false)
      // setShowGeneralResults(false)
      navigation.goBack() // powrót do poprzedniego ek
    } else {
      // Otherwise, show the exit modal
      setShowExitModal(true)
    }

    // Prevent default behavior of the back button
    return true
  }

  const scrollViewRef = useRef(null)

  useEffect(() => {
    if (showResultModal === false)
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false })
  }, [showResultModal])

  const [hideAnswers, setHideAnswers] = useState(false)

  useEffect(() => {
    async function checkIfShouldHide() {
      const shouldHide = await getValue('hide')
      if (shouldHide === null) setHideAnswers(false)
      else setHideAnswers(shouldHide)
    }
    checkIfShouldHide()
  }, [item])

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
        {/* <Gradient></Gradient> */}
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
            <AntDesign name="left" size={27} color="black" />
          </TouchableRipple>
        }

        {item && (
          <React.Fragment>
            <View style={{ marginTop: 50, width: '80%' }}>
              {/* <Question question={item?.question} /> */}
              <ContentRenderer content={item?.question} width={screenWidth * .9} />
            </View>

            {hideAnswers ? (
              <PaperButton
                mode="outlined"
                elevation={5}
                style={{
                  borderColor: buttonDark,
                  borderWidth: 1.5,
                }}
                onPress={() => {
                  setHideAnswers(false)
                }}
              >
                <Text>{showOptions}</Text>
              </PaperButton>
            ) : (
              <>
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
              </>
            )}
          </React.Fragment>
        )}

        {!item && <ActivityIndicator size={50} color={spinner} />}
      </ScrollView>
      <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={showResultModal}
        onRequestClose={() => nextBtnPress()}
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
        visible={showExitModal}
        onRequestClose={() => setShowResultModal(false)}
        text={areYouSure}
      >
        <React.Fragment>
          <View style={styles.buttonsContainer}>
            <PaperButton
              children={yesQuit}
              textColor="red"
              onPress={closeModalAndGoBack}
            />
            <PaperButton
              buttonColor="lightblue"
              textColor="#333"
              children={nah}
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
    backgroundColor: screenBackground,
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
