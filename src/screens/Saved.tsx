import { useHeaderHeight } from '@react-navigation/elements'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native'

import useFetchSavedItems from '../hooks/useFetchSavedItems'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { Item } from '../utils/types'
import {
  EmptyState,
  ListHeaderComponent,
  RenderItem,
  ResultModal,
  contentContainerStyle,
} from '../components/_ReusableComponents'

export default function Saved() {
  const headerHeight = useHeaderHeight()
  const { openQuiz } = useOpenQuiz()
  const [showLoadingMoreSpinner, setShowLoadingMoreSpinner] = useState(true)
  const { fetchSavedItems, savedItems, isPending } = useFetchSavedItems()
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)

  function seeFullQuestion(item: Item): void {
    setModalItem(item)
    setShowModal(true)
  }

  useEffect(() => {
    fetchSavedItems()
  }, [])

  useEffect(() => {
    setRefreshing(false)
  }, [savedItems])

  const [isEnabled, setIsEnabled] = useState(false)

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
    <View>
      <ResultModal
        modalItem={modalItem}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          renderItem={({ item }) => (
            <RenderItem item={item} seeFullQuestion={seeFullQuestion} />
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
                color="#0000ff"
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
