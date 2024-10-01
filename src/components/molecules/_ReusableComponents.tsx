//* Here are components used in Saved and Questions screens
import { Ionicons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native'
import {
  Button as PaperButton,
  Text as PaperText,
  Snackbar,
  Switch,
  TouchableRipple,
} from 'react-native-paper'

import {
  close,
  noQuestions,
  reverseTheOrder,
  takeAQuiz,
  youDontHaveAnySavedQuestions,
} from '../../../data/texts'
import { Item } from '../../utils/types'
import ItemResult from '.././ItemResult'
import Tile from '../Tile'
import { Colors } from './../../utils/constants'

export function ResultModal({
  modalItem,
  showModal,
  setShowModal,
  items,
  index,
}: {
  modalItem: Item
  showModal: boolean
  setShowModal: any
  items: Array<Item>
  index: number
}) {
  // useEffect(() => {
  //   if (showModal === true) scrollToIndex(index)
  // }, [showModal])

  // const flatListRef = useRef(null)
  // const scrollToIndex = index => {
  //   flatListRef.current.scrollToOffset({ animated: false, offset: 360 * index })
  // }
  return (
    <Modal
      // duration={1000}
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      statusBarTranslucent
    >
      {/* <FlatList
        pagingEnabled
        horizontal={true}
        ref={flatListRef}
        // contentContainerStyle={{
        //   width: '100%',
        // }}
        data={items} // Pass resultsArray directly to data prop
        keyExtractor={(item, index) => index.toString()} // Use a unique key for each item
        renderItem={(
          { item } // Destructure item from the object passed by FlatList
        ) => (
        )}
      /> */}
      <ItemResult
        item={modalItem} // Assuming item is structured as { item: Item, userChoices: Option[] }
        chosenOptions={null} // Access userChoices similarly
        handleBtnPress={() => setShowModal(false)}
        btnTitle={close}
      />
    </Modal>
  )
}

export function RenderItem({
  item,
  seeFullQuestion,
  index,
}: {
  item: Item
  seeFullQuestion: (item: Item, index: number) => void
  index: number
}) {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Tile
        item={item}
        handlePress={() => seeFullQuestion(item, index)}
        // handlePress={() => handlePress(item.item, item.userChoices, index)}
      />
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
          <ActivityIndicator size={50} color={Colors.primary} />
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
          <Snackbar
            visible={true}
            onDismiss={() => null}
            elevation={0}
            style={{
              bottom: 10,
              // backgroundColor: Colors.primary,
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
              }}
            >
              {parent === 'Saved' ? youDontHaveAnySavedQuestions : noQuestions}
            </Text>
          </Snackbar>
          <Text style={{ opacity: 0.7 }}></Text>
          {parent === 'Saved' ? (
            <Ionicons name="bookmarks" size={264} color={Colors.gradient} />
          ) : (
            <MaterialIcons name="quiz" size={264} color={Colors.gradient} />
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
          backgroundColor: Colors.primary,
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
            color={Colors.primary} // Kolor włączonego przycisku
            // uncheckedColor="gray" // Kolor wyłączonego przycisku
          />
          <PaperText variant={'labelMedium'} style={{ color: Colors.boldText }}>
            {reverseTheOrder}
          </PaperText>
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
