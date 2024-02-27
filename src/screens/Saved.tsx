import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, Text, View } from 'react-native'
import Explanation from '../components/Explanation'
import SavedOptions from '../components/SavedOptions'
import Tile from '../components/Tile'
import useFetchSavedItems from '../hooks/useFetchSavedItems'
import { Item } from '../utils/types'

//todo: util styles, refresh on scrollup, message if empty, loader if loading
export default function Saved() {
  const {fetchSavedItems, savedItems, isPending} = useFetchSavedItems()
  const [showModal, setShowModal] = useState(false)
  const [modalItem, setModalItem] = useState(null)
  const navigation = useNavigation()


  function seeFullQuestion(item: Item): void {
    setModalItem(item)
    setShowModal(true)
  }

  useEffect(() => {
    fetchSavedItems()
  }, []);

  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    savedItems.reverse()
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

      {savedItems.length > 0 ? (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
            paddingTop: 20,
            // height: '100%',
          }}
        >
          <SavedOptions
            onPressQuiz={() => {
              //@ts-ignore
              navigation.navigate('Quiz', {
                catName: '__Saved__',
                topArray: [],
                itemsArray: savedItems,
                howManyItems: savedItems.length,
                shuffle: false,
              })
            }}
            onToggleSwitch={toggleSwitch}
            isEnabled={isEnabled}
          />

          {savedItems.map((item, index) => (
            <Tile item={item} handlePress={seeFullQuestion} />
          ))}
        </ScrollView>
      ) : (
        <View>
          {isPending ? (
            <Text>Pobieranie</Text>
          ) : (
            <Text>nie zapisano jeszcze żadnego pytania</Text>
          )}
        </View>
      )}
    </View>
  )
}
