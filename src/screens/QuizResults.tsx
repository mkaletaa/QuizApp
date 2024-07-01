import React, { useEffect, useState } from 'react'
import { Modal, View, Text, Button, BackHandler, FlatList } from 'react-native'
import { setColor } from '../utils/functions'
import { Item, Option } from '../utils/types'
import ItemResult from '../components/ItemResult'
import Tile from '../components/Tile'
import { close } from '../../data/texts'
import { Button as PaperButton } from 'react-native-paper'
import useOpenQuiz from '../hooks/useOpenQuiz'

export default function QuizResults({ route }) {
  const [resultsArray, setResultsArray] = useState([])
  const [correctNr, setCorrectNr] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  const [modalChoices, setModalChoices] = useState<Option[]>()
  const { openQuiz } = useOpenQuiz()

  useEffect(() => {
    setResultsArray(route.params.resultsArray)
    let correct = 0
    route.params.resultsArray.forEach(result => {
      if (result.isCorrect === 'correct') correct++
    })
    setCorrectNr(correct)

    // const backHandler = BackHandler.addEventListener('hardwareBackPress', null)
    // return () => backHandler.remove()
  }, [])

  function handlePress(item: Item, choices: Option[]) {
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
      chapterName: '__Saved__', // todo: change
      itemsArray: itemsArray,
      howManyItems: itemsArray.length,
    })
  }

  // Renderowanie elementu listy
  const renderItem = ({ item }) => (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Tile
        item={item.item}
        handlePress={() => handlePress(item.item, item.userChoices)}
        color={setColor(item)}
      />
    </View>
  )

  // Komponent stopki listy
  const ListFooter = () => (
    <View style={{ marginVertical: 20 }}>
      <PaperButton
        mode="contained"
        style={{ backgroundColor: 'slateblue', paddingVertical: 10 }}
        onPress={() => retakeQuiz()}
      >
        <Text style={{ color: 'white' }}>Rozwiąż quiz ponownie</Text>
      </PaperButton>
      {/* todo: disable if all correct */}
      <PaperButton
        mode="contained"
        style={{ backgroundColor: 'slateblue', paddingVertical: 10 }}
        onPress={() => retakeQuiz(true)}
      >
        <Text style={{ color: 'white' }}>
          Rozwiąż quiz ponownie / tylko złe
        </Text>
      </PaperButton>
    </View>
  )

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
      <Text>
        Your score is {correctNr}/{resultsArray.length}
      </Text>

      <View
        style={{
          //   alignItems: 'center',
          width: '100%',
          //   backgroundColor: 'red',
        }}
      >
        <FlatList
          data={resultsArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={ListFooter}
          style={{}}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ItemResult
          item={modalItem}
          chosenOptions={modalChoices}
          handleBtnPress={() => setShowModal(false)}
          btnTitle={close}
        />
      </Modal>
    </View>
  )
}
