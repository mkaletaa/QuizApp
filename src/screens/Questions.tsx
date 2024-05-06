import { useHeaderHeight } from '@react-navigation/elements'
import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { countItemsInTopic, importItem } from '../utils/getQuizData'
import { Item } from '../utils/types'
import {
  EmptyState,
  ListHeaderComponent,
  RenderItem,
  ResultModal,
  contentContainerStyle,
} from '../components/molecules/_ReusableComponents'
import { screenBackground } from '../utils/constants'
export default function Questions({ route }) {
  const [itemsCount, setItemsCount] = useState(0)
  const [items, setItems] = useState<Item[]>([])

  const headerHeight = useHeaderHeight()
  const { openQuiz } = useOpenQuiz()

  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)

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
    <View
      style={{
        backgroundColor: screenBackground,
        height: "100%"
      }}
    >
      <ResultModal
        modalItem={modalItem}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {itemsCount > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <RenderItem item={item} seeFullQuestion={seeFullQuestion} />
          )}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={() => (
            <ListHeaderComponent
              itemsCount={0}
              onPressQuiz={() => {
                openQuiz({
                  chapterName: route.params.chapterName,
                  //@ts-ignore
                  itemsArray: items,
                  howManyItems: itemsCount,
                })
              }}
              onToggleSwitch={null}
              isEnabled={isEnabled}
            />
          )}
          contentContainerStyle={contentContainerStyle}
        />
      ) : (
        <EmptyState headerHeight={headerHeight} parent={'Questions'} />
      )}
    </View>
  )
}
