import { useEffect, useState } from 'react'
import { Modal, View } from 'react-native'
import { setColor } from '../utils/functions'
import { Item, Option, Result } from '../utils/types'
import ItemResult from './ItemResult'
import Tile from './Tile'
import { close } from '../../data/texts'

export default function GneralResults({
  resultsArray,
}: {
  resultsArray: Result[]
}) {
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
      }}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        {/* <Text>
          Your score is {correctNr}/{resultsArray.length}
        </Text> */}
      </View>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ItemResult
          showQuestion={true}
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
