import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import CustomModal from './src/components/CustomModal'
import { noInternetMessage } from './data/texts'
import { clearAsyncStorage, saveItemsRecursively } from './tests/savedItems'
export default function App() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setShowModal(!state.isConnected)
      console.log('Is connected?', state.isConnected)
    })

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
