import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Dimensions, Modal, Text, View } from 'react-native'
import { Item, Option, Result } from '../utils/types'
import Explanation from './Explanation'
import Tile from './Tile'

export default function GneralResults({
  resultsArray,
}: {
  resultsArray: Result[]
}) {
  const navigation = useNavigation()

  const [correctNr, setCorrectNr] = useState(0)
  useEffect(() => {
    let correct = 0
    resultsArray.forEach(result => {
      if (result.isCorrect === 'correct') correct++
    })
    setCorrectNr(correct)
  }, [])

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
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text>
          Your score is {correctNr}/{resultsArray.length}
        </Text>
      </View>
      {resultsArray.map((result, index) => (
        <Tile
          item={result.item}
          handlePress={() => {
            handlePress(result.item, result.userChoices)
          }}
          color={setColor(result)}
        />
        // <Pressable

        //   onPress={() => {
        //     handlePress(result.item, result.userChoices)
        //   }}
        // >
        //   <View
        //     style={[
        //       {
        //         backgroundColor: setColor(result),
        //         width: 250,
        //         height: 80, //100
        //         overflow: 'hidden',
        //         alignItems: 'center',
        //         marginTop: 16,
        //         borderRadius: 10,
        //         elevation: 3,
        //       },
        //     ]}
        //   >
        //     {/* <Text>{index}</Text> */}

        //     <Question question={result.item.question} />

        //     {/* <Explanation showQuestion={true} item={result.item} chosenOptions={result.userChoices} nextItem={null} btnTitle={''}/> */}

        //     <LinearGradient
        //       // Button Linear Gradient
        //       colors={['transparent', setColor(result)]}
        //       style={{
        //         width: screenWidth,
        //         height: 50,
        //         position: 'absolute',
        //         bottom: 0,
        //       }}
        //     ></LinearGradient>
        //     {/* <ContentRenderer content={result.item.question}></ContentRenderer> */}
        //   </View>
        // </Pressable>
      ))}

      {/* <Button title='go back' onPress={() => navigation.goBack()} /> */}

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
          btnTitle={'close'}
        />
      </Modal>
    </View>
  )
}
