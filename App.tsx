import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import MyStack from './src/Stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.clear()
      console.log('AsyncStorage został wyczyszczony.')
    } catch (error) {
      console.error('Błąd podczas czyszczenia AsyncStorage:', error)
    }
  }

  // Wywołaj funkcję, aby wyczyścić AsyncStorage
  // clearAsyncStorage()

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
