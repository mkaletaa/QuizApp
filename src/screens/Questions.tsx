import { useEffect, useState } from 'react'
import {
  View,
  Text,
  Modal,
  FlatList,
  Button,
  ActivityIndicator,
  Dimensions,
} from 'react-native'
import useQuizData from '../utils/useQuizData'
import { Item } from '../utils/types'
import Explanation from '../components/Explanation'
import Tile from '../components/Tile'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { useNavigation } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/elements'
import { youDontHaveAnySavedQuestions } from '../../data/texts'
import { Ionicons } from '@expo/vector-icons'
import SavedOptions from '../components/SavedOptions'

export default function Questions({ route }) {
  const { countItemsInTopic, importItem } = useQuizData()
  const [itemsCount, setItemsCount] = useState(0)
  const [items, setItems] = useState<Item[]>([])

  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  const { openQuiz } = useOpenQuiz()
  const [showLoadingMoreSpinner, setShowLoadingMoreSpinner] = useState(true)
  // const { fetchSavedItems, savedItems, isPending } = useFetchSavedItems()
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const navigation = useNavigation()
  const [shuffle, setShuffle] = useState<boolean>()
  function seeFullQuestion(item: Item): void {
    setModalItem(item)
    setShowModal(true)
  }

  useEffect(() => {
    const n_items = countItemsInTopic(
      route.params.topicName,
      route.params.chapterName
    )

    setItemsCount(n_items)

    let itemsArray: Item[] = []
    for (let i = 0; i < n_items; i++) {
        const item: Item = importItem(
            route.params.chapterName,
            route.params.topicName,
            i
        )
        // console.log('item: ', item)
      itemsArray.push(item)
    }
    setItems(itemsArray)
  }, [])

  useEffect(() => {
    setRefreshing(false)
  }, [items])

  const [isEnabled, setIsEnabled] = useState(false)

  const [refreshing, setRefreshing] = useState(false)

  return (
    <View>
      <Modal
        // duration={1000}
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Explanation
          showQuestion={true}
          item={modalItem}
          chosenOptions={null}
          handleBtnPress={() => {
            setShowModal(false)
          }}
          btnTitle={'close'}
        />
      </Modal>

      {itemsCount > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Tile item={item} handlePress={seeFullQuestion} />
          )}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={() => (
            <SavedOptions
              itemsCount={0}
              onPressQuiz={() => {
                openQuiz({
                  chapterName: route.params.chapterName,
                  itemsArray: items,
                  howManyItems: itemsCount,
                })
                //@ts-ignore
                // navigation.navigate('Quiz', {
                //   chapName: '__Saved__',
                //   // topArray: [],
                //   itemsArray: savedItems,
                //   howManyItems: savedItems.length,
                //   shuffle,
                // })
              }}
              onToggleSwitch={null}
              isEnabled={isEnabled}
            />
            // <Button title=""></Button>
          )}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 10,
            //todo: zmienić szerokość lub padding
          }}
          //   onEndReached={() => setShowLoadingMoreSpinner(false)}
        />
      ) : (
        <View>
          {false ? (
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
                {youDontHaveAnySavedQuestions}
              </Text>
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
      )}
    </View>
  )
}
