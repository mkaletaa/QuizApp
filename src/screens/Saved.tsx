import { Ionicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  View,
} from 'react-native'
import { close, youDontHaveAnySavedQuestions } from '../../data/texts'
import Explanation from '../components/Explanation'
import SavedOptions from '../components/SavedOptions'
import Tile from '../components/Tile'
import useFetchSavedItems from '../hooks/useFetchSavedItems'
import useOpenQuiz from '../hooks/useOpenQuiz'
import { Item } from '../utils/types'

export default function Saved() {
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  const openQuiz = useOpenQuiz()
  const [showLoadingMoreSpinner, setShowLoadingMoreSpinner] = useState(true)
  const { fetchSavedItems, savedItems, isPending } = useFetchSavedItems()
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const navigation = useNavigation()

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
          btnTitle={close}
        />
      </Modal>

      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          renderItem={({ item }) => (
            <Tile item={item} handlePress={seeFullQuestion} />
          )}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={() => (
            <SavedOptions
              itemsCount={savedItems.length}
              onPressQuiz={() => {
                //@ts-ignore
                navigation.navigate('Quiz', {
                  chapName: '__Saved__',
                  // topArray: [],
                  itemsArray: savedItems,
                  howManyItems: savedItems.length,
                  shuffle: false,
                })
              }}
              onToggleSwitch={toggleSwitch}
              isEnabled={isEnabled}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 10,
            //todo: zmienić szerokość lub padding
          }}
          ListFooterComponent={
            showLoadingMoreSpinner && <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 10}} />
          }
          onEndReached={()=>setShowLoadingMoreSpinner(false)} 
        />
      ) : (
        <View>
          {isPending ? (
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
