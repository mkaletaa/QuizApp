//* Here are components used in Saved and Questions screens

import {
  ActivityIndicator,
  Dimensions,
  Modal,
  View,
  Text,
  Button,
  Switch,
  Pressable,
} from 'react-native'
import ItemResult from './ItemResult'
import { Item } from '../utils/types'
import {
  close,
  reverseTheOrder,
  takeAQuiz,
  youDontHaveAnySavedQuestions,
} from '../../data/texts'
import Tile from './Tile'
import { Ionicons } from '@expo/vector-icons'

export function ResultModal({
  modalItem,
  showModal,
  setShowModal,
}: {
  modalItem: Item
  showModal: boolean
  setShowModal: any
}) {
  return (
    <Modal
      // duration={1000}
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <ItemResult
        //   showQuestion={true}
        item={modalItem}
        chosenOptions={null}
        handleBtnPress={() => {
          setShowModal(false)
        }}
        btnTitle={close}
      />
    </Modal>
  )
}

export function RenderItem({
  item,
  seeFullQuestion,
}: {
  item: Item
  seeFullQuestion: (i: Item) => void
}) {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Tile item={item} handlePress={seeFullQuestion} />
    </View>
  )
}

export function EmptyState({
  condition = false,
  headerHeight,
}: {
  condition?: boolean
  headerHeight: number
}) {
  const screenHeight = Dimensions.get('window').height
  return (
    <View>
      {condition ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: screenHeight - headerHeight,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // top: 100
            gap: 20,
            // backgroundColor: 'red',
            height: screenHeight - headerHeight,
          }}
        >
          <Text style={{ opacity: 0.7 }}>{youDontHaveAnySavedQuestions}</Text>
          <Ionicons
            style={{
              opacity: 0.1,
            }}
            name="bookmarks"
            size={264}
            color="black"
          />
        </View>
      )}
    </View>
  )
}

export function ListHeaderComponent({
  itemsCount,
  onPressQuiz,
  onToggleSwitch,
  isEnabled,
}) {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: 'center', // Wyśrodkowanie w pionie
        alignItems: 'center',
        gap: 30,
        flexDirection: 'row',
        // backgroundColor: 'red',
      }}
    >
      {/* <Pressable
        style={{
          backgroundColor: 'rgb(0, 150, 255)',
          width: 100,
          padding: 10,
          elevation: 5,
          borderRadius: 3,
        }}
        onPress={onPressQuiz}
      >
        <Text>{takeAQuiz}</Text>
      </Pressable> */}
      <Button onPress={onPressQuiz} title={takeAQuiz} />
      {itemsCount > 1 && (
        <Pressable
          onPress={() => onToggleSwitch()}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: -10, //used to be -15
            marginBottom: 10,

            // backgroundColor: 'blue',
          }}
        >
          <Switch onValueChange={onToggleSwitch} value={isEnabled} />
          <Text>{reverseTheOrder}</Text>
        </Pressable>
      )}
    </View>
  )
}

export const contentContainerStyle = {
  paddingBottom: 40,
  paddingTop: 10,
  //todo: zmienić szerokość lub padding
}
