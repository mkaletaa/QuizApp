import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
// import * as DevClient from 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';



import { noInternetMessage } from './data/texts';
import CustomModal from './src/components/CustomModal';
import MyStack from './src/Stack';
import { clearAsyncStorage, saveItemsRecursively } from './tests/savedItems'


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
})

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [appIsReady, setAppIsReady] = useState(false)

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
      }
    } catch (error) {
      alert(`Error fetching Expo update : ${error}`)
    }
  }

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for two seconds to simulate a slow loading experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()

    const unsubscribe = NetInfo.addEventListener(state => {
      setShowModal(!state.isConnected)
      console.log('Is connected?', state.isConnected)
      if (state.isConnected) onFetchUpdateAsync() //if no internet connection - don't try to fetch updates
    })

    //*dev mode
    // saveItemsRecursively(0)
    // clearAsyncStorage()

    return () => {
      unsubscribe()
    }
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider>
          <NavigationContainer>
            <MyStack />

            <CustomModal
              visible={showModal}
              text={noInternetMessage}
              icon={'wifi-off'}
              onRequestClose={() => setShowModal(false)}
            ></CustomModal>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default Sentry.wrap(App)