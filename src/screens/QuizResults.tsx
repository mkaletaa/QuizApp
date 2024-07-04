import React, { useEffect, useRef, useState } from 'react'
import { Modal, View, Text, FlatList } from 'react-native'
import { setColor } from '../utils/functions'
import { Item, Option } from '../utils/types'
import ItemResult from '../components/ItemResult'
import Tile from '../components/Tile'
import { close } from '../../data/texts'
import { Divider, Button as PaperButton } from 'react-native-paper'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { retake, retakeWrong } from '../../data/texts'
import { PieChart } from 'react-native-chart-kit'
import { surfaceBg } from '../utils/constants'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from '../components/molecules/Chart'

export default function QuizResults({ route }) {
  const [resultsArray, setResultsArray] = useState([])
  const [correctNr, setCorrectNr] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  const [modalChoices, setModalChoices] = useState<Option[]>()
  const { openQuiz } = useOpenQuiz()
  const [index, setIndex] = useState(0)

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

  useEffect(() => {
    if (showModal === true) scrollToIndex(index)
  }, [showModal])

  const flatListRef = useRef(null)
  const scrollToIndex = index => {
    flatListRef.current.scrollToOffset({ animated: false, offset: 360 * index })
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
      howManyItems: itemsArray.length,
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
    <Chart resultsArray={resultsArray}/>
  )

  const navigation = useNavigation()

  const ListFooter = () => (
    <View style={{ marginVertical: 40, alignItems: 'center', gap: 20 }}>
      <PaperButton
        mode="outlined"
        style={{ borderColor: 'slateblue', paddingVertical: 3, width: 230  }}
        onPress={() => retakeQuiz()}
      >
        <Text>{retake}</Text>
      </PaperButton>

      {resultsArray.every(el => el.isCorrect === 'correct') ? null : (
        <PaperButton
          mode="outlined"
          style={{ borderColor: 'slateblue', paddingVertical: 3, width: 230  }}
          onPress={() => retakeQuiz(true)}
        >
          <Text>{retakeWrong}</Text>
        </PaperButton>
      )}

      <PaperButton
        mode="elevated"
        style={{ backgroundColor: 'slateblue', paddingVertical: 1, marginTop: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: 'white' }}>Wyjdź</Text>
      </PaperButton>
    </View>
  )

  return (
    <SafeAreaView>
      <FlatList
        data={resultsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        style={{}}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <FlatList
          pagingEnabled
          horizontal={true}
          ref={flatListRef}
          data={resultsArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ItemResult
              item={item.item}
              chosenOptions={item.userChoices}
              handleBtnPress={() => setShowModal(false)}
              btnTitle={close}
            />
          )}
        />
      </Modal>
    </SafeAreaView>
  )
}
