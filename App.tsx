import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import CustomModal from './src/components/CustomModal'
import { noInternetMessage } from './data/texts'

export default function App() {
  const [showModal, setShowModal] = useState(false)

  /*dev mode */
  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear()
      console.log('AsyncStorage został wyczyszczony.')
    } catch (error) {
      console.error('Błąd podczas czyszczenia AsyncStorage:', error)
    }
  }

  /*dev mode */
  async function testSaveItems(index) {
    const value = 'elektronika|wzmacniacz_operacyjny|' + index

    try {
      const existingItems = await AsyncStorage.getItem('savedItems')
      let savedItems = []

      if (existingItems) {
        savedItems = JSON.parse(existingItems)
      }

      savedItems.push(value)

      await AsyncStorage.setItem('savedItems', JSON.stringify(savedItems))
      // setSaved(true)
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setShowModal(!state.isConnected)
    console.log('Is connected?', state.isConnected)
  })

  // Funkcja do rekurencyjnego zapisywania danych do AsyncStorage
  const saveItemsRecursively = async index => {
    if (index < 42) {
      await testSaveItems(index)
      await saveItemsRecursively(index + 1) // Wywołanie rekurencyjne dla kolejnego indeksu
    }
  }

  // Uruchomienie rekurencyjnego zapisywania danych
  // saveItemsRecursively(0)

  return () => {
    unsubscribe()
  }
}, [])


  return (
    <NavigationContainer>
      <MyStack />

      <CustomModal
        showModal={showModal}
        modalText={noInternetMessage}
        onRequestClose={() => setShowModal(false)}
      >
        <Button title="OK" onPress={() => setShowModal(false)} />
      </CustomModal>
    </NavigationContainer>
  )
}