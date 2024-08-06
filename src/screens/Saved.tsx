import { useHeaderHeight } from '@react-navigation/elements'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'

import {
  contentContainerStyle,
  EmptyState,
  ListHeaderComponent,
  RenderItem,
  ResultModal,
} from '../components/molecules/_ReusableComponents'
import useFetchSavedItems from '../hooks/useFetchSavedItems'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { screenBackground, spinner } from '../utils/constants'
import { Item } from '../utils/types'

export default function Saved() {
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const [showLoadingMoreSpinner, setShowLoadingMoreSpinner] = useState(true)
  const [index, setIndex] = useState(0)
  const [isEnabled, setIsEnabled] = useState(false)

  const headerHeight = useHeaderHeight()
  const { openQuiz } = useOpenQuiz()
  const { fetchSavedItems, savedItems, isPending } = useFetchSavedItems()
  
  useEffect(() => {
    fetchSavedItems()
  }, [])
  
  useEffect(() => {
    setRefreshing(false)
  }, [savedItems])
  
  function seeFullQuestion(item: Item, index: number): void {
    setModalItem(item)
    setShowModal(true)
    setIndex(index)
  }
  

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    savedItems.reverse()
  }

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    fetchSavedItems()
    setIsEnabled(false)
  }

  return (
    <View
      style={{
        backgroundColor: screenBackground,
        height: '100%',
      }}
    >
      <ResultModal
        items={savedItems}
        index={index}
        modalItem={modalItem}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          renderItem={({ item, index }) => (
            <RenderItem
              item={item}
              index={index}
              seeFullQuestion={seeFullQuestion}
            />
          )}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={() => (
            <ListHeaderComponent
              itemsCount={savedItems.length}
              onPressQuiz={() => {
                openQuiz({
                  chapterName: '__Saved__',
                  itemsArray: savedItems,
                  howManyItems: savedItems.length,
                })
              }}
              onToggleSwitch={toggleSwitch}
              isEnabled={isEnabled}
            />
          )}
          contentContainerStyle={contentContainerStyle}
          ListFooterComponent={
            showLoadingMoreSpinner && (
              <ActivityIndicator
                size={50}
                color={spinner}
                style={{ marginTop: 10 }}
              />
            )
          }
          onEndReached={() => setShowLoadingMoreSpinner(false)}
        />
      ) : (
        <EmptyState
          condition={isPending}
          headerHeight={headerHeight}
          parent={'Saved'}
        />
      )}
    </View>
  )
}
