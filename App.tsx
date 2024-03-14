import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import CustomModal from './src/components/CustomModal'

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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setShowModal(!state.isConnected)
      console.log('Is connected?', state.isConnected)
    })
    // clearAsyncStorage();

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <NavigationContainer>
      <MyStack />

      <CustomModal
        showModal={showModal}
        modalText={'You have no Internet connection. Some sources like images may not load properly'}
        onRequestClose={() => setShowModal(false)}
      >

        <Button title="OK" onPress={() => setShowModal(false)}/>
      </CustomModal>
    </NavigationContainer>
  )
}