import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import CustomModal from './src/components/CustomModal'
import { noInternetMessage } from './data/texts'
import { testSaveItems, clearAsyncStorage } from './tests/savedItems'
export default function App() {
  const [showModal, setShowModal] = useState(false)

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

    // clearAsyncStorage()

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
