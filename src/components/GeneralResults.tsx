import { View, Text, Dimensions, Modal, Pressable } from 'react-native'
import ContentRenderer from './ContentRenderer'
import { Item, Result, Option } from '../utils/types'
import Explanation from './Explanation'
import { useState } from 'react'

export default function GneralResults({
  resultsArray,
}: {
  resultsArray: Result[]
}) {
  const screenWidth = Dimensions.get('window').width
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState<Item>()
  const [modalChoices, setModalChoices] = useState<Option[]>()

  function handlePress(item: Item, choices: Option[]) {
    setShowModal(true)
    setModalItem(item)
    setModalChoices(choices)
  }

  function setColor(result: Result): 'green' | 'red' | 'orange' {
    //TODO: make a util out of this function
    if (result.isCorrect === 'correct') return 'green'
    if (result.isCorrect === 'incorrect') return 'red'
    if (result.isCorrect === 'kindof') return 'orange'
  }

  return (
    <View>
      {resultsArray.map((result, index) => (
        <View
          style={[
            {
              backgroundColor: setColor(result),
              width: 50,
              height: 20,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              handlePress(result.item, result.userChoices)
            }}
          >
            <Text>{index}</Text>
          </Pressable>

          {/* <ContentRenderer content={result.item.question}></ContentRenderer> */}
        </View>
      ))}

      <Modal
        // duration={1000}
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Explanation
          item={modalItem}
          chosenOptions={modalChoices}
          nextItem={() => {setShowModal(false)}}
          btnTitle={'close'}
        />
      </Modal>
    </View>
  )
}
