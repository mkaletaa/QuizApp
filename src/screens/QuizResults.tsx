import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { close, retake, retakeWrong } from '../../data/texts'
import ItemResult from '../components/ItemResult'
import ResultsHeader from '../components/ResultsHeader'
import Tile from '../components/Tile'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { Colors } from '../utils/constants'
import { setColor } from '../utils/functions'
import { Item, Option } from '../utils/types'

export default function QuizResults({ route }) {
  const [resultsArray, setResultsArray] = useState([])
  const [correctNr, setCorrectNr] = useState(0)
  const [incorrectNr, setIncorrectNr] = useState(0)
  const [kindofNr, setKindofNr] = useState(0)

  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  // const [index, setIndex] = useState(0)
  const [modalChoices, setModalChoices] = useState<Option[]>()

  const { openQuiz } = useOpenQuiz()
  const navigation = useNavigation()

  useEffect(() => {
    setResultsArray(route.params.resultsArray)
    let correct = 0
    let incorrect = 0
    let partiallyCorrect = 0
    route.params.resultsArray.forEach(result => {
      if (result.isCorrect === 'correct') correct++
      if (result.isCorrect === 'incorrect') incorrect++
      if (result.isCorrect === 'kindof') partiallyCorrect++
    })
    setCorrectNr(correct)
    setIncorrectNr(incorrect)
    setKindofNr(partiallyCorrect)
  }, [])

  function handlePress(item: Item, choices: Option[], index: number) {
    // setIndex(index)
    setShowModal(true)
    setModalItem(item)
    setModalChoices(choices)
  }

  function retakeQuiz(incorrectOnly = false) {
    let itemsArray
    if (incorrectOnly) {
      itemsArray = resultsArray
        .filter(el => el.isCorrect !== 'correct')
        .map(el => el.item)
    } else {
      itemsArray = resultsArray.map(el => el.item)
    }
    openQuiz({
      chapterName: '__Again__',
      itemsArray: itemsArray,
      itemsCount: itemsArray.length,
      isRetake: true,
    })
  }

  const renderItem = ({ item, index }) => (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Tile
        item={item.item}
        handlePress={() => handlePress(item.item, item.userChoices, index)}
        color={setColor(item)}
      />
    </View>
  )

  const ListHeader = () => (
    <ResultsHeader
      resultsArray={resultsArray}
      correctNr={correctNr}
      kindofNr={kindofNr}
      incorrectNr={incorrectNr}
    />
  )

  const ListFooter = () => (
    <View
      style={{
        width: '100%',
        marginVertical: 40,
        alignItems: 'center',
        gap: 10,
        flex: 1,
        justifyContent: 'flex-end',
      }}
    >
      <PaperButton
        mode="contained"
        rippleColor="thistle"
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 1,
          width: 230,
        }}
        onPress={() => retakeQuiz()}
      >
        <Text style={{ color: 'white' }}>{retake}</Text>
      </PaperButton>

      {resultsArray.every(el => el.isCorrect === 'correct') ? null : (
        <PaperButton
          rippleColor="thistle"
          mode="contained"
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 1,
            width: 230,
          }}
          onPress={() => retakeQuiz(true)}
        >
          <Text style={{ color: 'white' }}>{retakeWrong}</Text>
        </PaperButton>
      )}
    </View>
  )

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          backgroundColor: Colors.screenBg,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            position: 'absolute',
            left: 20,
            top: 15,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color="black" />
        </TouchableOpacity>

        <FlatList
          data={resultsArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          contentContainerStyle={{
            paddingTop: 60,
          }}
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          {/* <FlatList
            pagingEnabled
            horizontal={true}
            ref={flatListRef}
            data={resultsArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            )}
          /> */}
          <ItemResult
            item={modalItem}
            chosenOptions={modalChoices}
            handleBtnPress={() => setShowModal(false)}
            btnTitle={close}
          />
        </Modal>
      </View>
    </SafeAreaView>
  )
}
