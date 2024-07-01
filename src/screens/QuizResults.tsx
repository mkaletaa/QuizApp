import React, { useEffect, useState } from 'react'
import { Modal, View, Text, Button } from 'react-native'
import { setColor } from '../utils/functions'
import { Item, Option, Result } from '../utils/types'
import ItemResult from '../components/ItemResult'
import Tile from '../components/Tile'
import { close } from '../../data/texts'
import {
  Switch,
  Button as PaperButton,
  Text as PaperText,
  TouchableRipple,
} from 'react-native-paper'
import useOpenQuiz from '../hooks/useOpenQuiz'

export default function QuizResults({ route }) {
  const [resultsArray, setResultsArray] = useState([])

  useEffect(() => {
    setResultsArray(route.params.resultsArray)
  }, [])
  const [correctNr, setCorrectNr] = useState(0)

  useEffect(() => {
    let correct = 0
    resultsArray.forEach(result => {
      if (result.isCorrect === 'correct') correct++
    })
    setCorrectNr(correct)
  }, [])

  // const screenWidth = Dimensions.get('window').width
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  const [modalChoices, setModalChoices] = useState<Option[]>()
  const { openQuiz, noQuestionModal } = useOpenQuiz()

  function handlePress(item: Item, choices: Option[]) {
    setShowModal(true)
    setModalItem(item)
    setModalChoices(choices)
  }

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
      }}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text>
          Your score is {correctNr}/{resultsArray.length}
        </Text>
      </View>
      {/* //todo: to najlepiej zamienić na FlatList */}
      {resultsArray.map((result, index) => (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Tile
            item={result.item}
            handlePress={() => {
              handlePress(result.item, result.userChoices)
            }}
            color={setColor(result)}
          />
        </View>
      ))}

      <PaperButton
        mode="elevated"
        // onPress={onPressQuiz}
        // disabled={chosenOptions.length === 0}
        elevation={5}
        style={{
          backgroundColor: 'slateblue',
          marginTop: 20,
        }}
        rippleColor="thistle"
        onPress={() => openQuiz({ topicName: 'top_1', chapterName: 'cat_1' })}
      >
        <Text
          style={{
            color: 'white',
          }}
        >
          rozwiąż quiz ponownie
        </Text>
      </PaperButton>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ItemResult
          // showQuestion={true}
          item={modalItem}
          chosenOptions={modalChoices}
          handleBtnPress={() => {
            setShowModal(false)
          }}
          btnTitle={close}
        />
      </Modal>
    </View>
  )
}
