import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

export default function App() {
  const [isConnected, setIsConnected] = useState(true)

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear()
      console.log('AsyncStorage został wyczyszczony.')
    } catch (error) {
      console.error('Błąd podczas czyszczenia AsyncStorage:', error)
    }
  }

  useEffect(() => {
    // Subskrybuj zmiany w stanie połączenia
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
      console.log('Is connected?', state.isConnected)
    })

    // Wywołaj funkcję, aby wyczyścić AsyncStorage
    // clearAsyncStorage();

    // Zwróć funkcję czyszczącą dla odsubskrybowania, gdy komponent jest odmontowywany
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
