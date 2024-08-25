import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Modal, Text, View } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

import { close, exit, retake, retakeWrong } from '../../data/texts'
import ItemResult from '../components/ItemResult'
import Gradient from '../components/molecules/atoms/Gradient'
// import Chart from '../components/molecules/Chart';
import Tile from '../components/Tile'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { Colors } from '../utils/constants'
import { setColor } from '../utils/functions'
import { Item, Option } from '../utils/types'

export default function QuizResults({ route }) {
  const [resultsArray, setResultsArray] = useState([])
  const [correctNr, setCorrectNr] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  const [index, setIndex] = useState(0)
  const [modalChoices, setModalChoices] = useState<Option[]>()

  const { openQuiz } = useOpenQuiz()
  const navigation = useNavigation()

  useEffect(() => {
    setResultsArray(route.params.resultsArray)
    let correct = 0
    route.params.resultsArray.forEach(result => {
      if (result.isCorrect === 'correct') correct++
    })
    setCorrectNr(correct)
  }, [])

  function handlePress(item: Item, choices: Option[], index: number) {
    setIndex(index)
    setShowModal(true)
    setModalItem(item)
    setModalChoices(choices)
  }

  // useEffect(() => {
  //   if (showModal === true) scrollToIndex(index)
  // }, [showModal])

  // const flatListRef = useRef(null)
  // const scrollToIndex = index => {
  //   flatListRef.current.scrollToOffset({ animated: false, offset: 360 * index })
  // }

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

  const ListHeader = () =>
    // <Chart resultsArray={resultsArray}/>
    null

  const ListFooter = () => (
    <View style={{ marginVertical: 40, alignItems: 'center', gap: 20 }}>
      <PaperButton
        mode="elevated"
        rippleColor="thistle"
        style={{
          backgroundColor: Colors.primary,
          paddingVertical: 3,
          width: 230,
        }}
        onPress={() => retakeQuiz()}
      >
        <Text style={{ color: 'white' }}>{retake}</Text>
      </PaperButton>

      {resultsArray.every(el => el.isCorrect === 'correct') ? null : (
        <PaperButton
          rippleColor="thistle"
          mode="elevated"
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 4,
            width: 230,
          }}
          onPress={() => retakeQuiz(true)}
        >
          <Text style={{ color: 'white' }}>{retakeWrong}</Text>
        </PaperButton>
      )}

      <PaperButton
        mode="outlined"
        style={{
          borderColor: Colors.primary,
          borderWidth: 1.5,
          // paddingVertical: 0,
          marginTop: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: Colors.primary }}>{exit}</Text>
      </PaperButton>
    </View>
  )

  return (
    <SafeAreaView>
      <View style={{ height: '100%', justifyContent: 'flex-end' }}>
        <Gradient />
        <View>
          {
            //todo: try to remove this View and see what happens
          }

          <FlatList
            data={resultsArray}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooter}
            contentContainerStyle={{
              paddingTop: 20,
              //backgroundColor: 'red'
            }}
          />
        </View>
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
