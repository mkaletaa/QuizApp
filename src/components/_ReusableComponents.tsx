//* Here are components used in Saved and Questions screens

import {
  ActivityIndicator,
  Dimensions,
  Modal,
  View,
  Text,
  Button,
  Pressable,
} from 'react-native'
import ItemResult from './ItemResult'
import { Item } from '../utils/types'
import {
  close,
  noQuestions,
  reverseTheOrder,
  takeAQuiz,
  youDontHaveAnySavedQuestions,
} from '../../data/texts'
import Tile from './Tile'
import { Ionicons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import {
  Switch,
  Button as PaperButton,
  Text as PaperText,
  TouchableRipple,
} from 'react-native-paper'
import { surfaceBg, buttonDark, buttonLight } from '../utils/constants'

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
  parent,
}: {
  condition?: boolean
  headerHeight: number
  parent: 'Questions' | 'Saved'
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
          <Text style={{ opacity: 0.7 }}>
            {parent === 'Saved' ? youDontHaveAnySavedQuestions : noQuestions}
          </Text>
          {parent === 'Saved' ? (
            <Ionicons
              style={{
                opacity: 0.1,
              }}
              name="bookmarks"
              size={264}
              color="black"
            />
          ) : (
            <MaterialIcons
              name="quiz"
              size={264}
              color="black"
              style={{
                opacity: 0.1,
              }}
            />
          )}
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
        marginTop: 20,
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
      {/* <Button onPress={onPressQuiz} title={takeAQuiz} /> */}
      <PaperButton
        mode="elevated"
        onPress={onPressQuiz}
        // disabled={chosenOptions.length === 0}
        elevation={5}
        style={{
          backgroundColor: 'slateblue',
        }}
        rippleColor="thistle"
      >
        <Text
          style={{
            color: 'white',
          }}
        >
          {takeAQuiz}
        </Text>
      </PaperButton>
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
          <Switch
            onValueChange={onToggleSwitch}
            value={isEnabled}
            color={buttonDark} // Kolor włączonego przycisku
            // uncheckedColor="gray" // Kolor wyłączonego przycisku
          />
          <PaperText variant={"labelMedium"} style={{ color: buttonDark }}>{reverseTheOrder}</PaperText>
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
