import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import Explanation from '../components/Explanation'
import SavedOptions from '../components/SavedOptions'
import Tile from '../components/Tile'
import useFetchSavedItems from '../hooks/useFetchSavedItems'
import { Item } from '../utils/types'
import { Ionicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import useOpenQuiz from '../hooks/useOpenQuiz'


export default function Saved() {
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  const openQuiz = useOpenQuiz()

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
    // Tutaj dodaj logikę odświeżania (np. pobranie nowych danych z serwera).
    // Następnie ustaw refreshing na false, aby zakończyć animację odświeżania.
    setRefreshing(true)
    fetchSavedItems()
    // Wywołaj funkcję do odświeżenia danych, a potem:
    // setRefreshing(false);
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
          btnTitle={'close'}
        />
      </Modal>

      {savedItems.length>0 ? (
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
                  shuffle: true,
                })
              }}
              onToggleSwitch={toggleSwitch}
              isEnabled={isEnabled}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 10,
          }}
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
              <Text style={{opacity: .7}}>You don't have any saved questions</Text>
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
