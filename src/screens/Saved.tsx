import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useQuizData from '../hooks/useQuizData'
import ContentRenderer from '../components/ContentRenderer'
import Question from '../components/Question'
import { Item } from '../utils/types'

export default function Saved() {
  const [savedItems, setSavedItems] = useState([])
  const { importItemById } = useQuizData()

  useEffect(() => {
    console.log('first saved')
    // Funkcja pobierająca dane z AsyncStorage
    const fetchSavedItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('savedItems')
        if (jsonValue !== null) {
          // Parsuj wartość JSON i przypisz do stanu savedItems
          const parsedItems: string[] = JSON.parse(jsonValue)
          console.log("🚀 ~ fetchSavedItems ~ parsedItems:", parsedItems)
         let itemsH: Item[] = []

         // Wywołaj funkcję z hooka wewnątrz useEffect
         for (const id of parsedItems) {
           console.log('🚀 ~ fetchSavedItems ~ id:', id)
           itemsH.push(importItemById(id))
         }
           console.log("🚀 ~ fetchSavedItems ~ itemsH:", itemsH)

          setSavedItems(itemsH)
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych z AsyncStorage:', error)
      }
    }

    // Wywołaj funkcję pobierającą dane przy mountowaniu komponentu
    fetchSavedItems()
  }, [])

  return (
    <View>
      <Text>saved</Text>
      <ScrollView>
        {savedItems.map((item, index) => (
          <View>
            <Question question={item.question} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
