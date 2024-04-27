import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import CustomModal from './src/components/CustomModal'
import { noInternetMessage } from './data/texts'
import { clearAsyncStorage, saveItemsRecursively } from './tests/savedItems'
import * as Updates from 'expo-updates'
import { setValue } from './src/utils/utilStorage'
import * as Sentry from "@sentry/react-native";

Sentry.init({
  // dsn: "https://cddc198d99e3f115e9908339b2c88eea@o4507158412853248.ingest.de.sentry.io/4507158418882640",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

const  App = ()=> {
  const [showModal, setShowModal] = useState(false)


  async function onFetchUpdateAsync(){
    try{
      const update = await Updates.checkForUpdateAsync()

      if(update.isAvailable){
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch(error){
      alert(`Error fetching Expo update : ${error}`)
    }
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setShowModal(!state.isConnected)
      console.log('Is connected?', state.isConnected)
    })

    onFetchUpdateAsync()

    //*dev mode
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
//!prod
// export default Sentry.wrap(App)
export default App