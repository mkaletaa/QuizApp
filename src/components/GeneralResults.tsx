import { useEffect, useState } from 'react'
import { Modal, View } from 'react-native'
import { setColor } from '../utils/functions'
import { Item, Option, Result } from '../utils/types'
import Explanation from './Explanation'
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
    <View>
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
        <Tile
          item={result.item}
          handlePress={() => {
            handlePress(result.item, result.userChoices)
          }}
          color={setColor(result)}
        />
     
      ))}


      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Explanation
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
