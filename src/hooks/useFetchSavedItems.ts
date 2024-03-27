import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useQuizData from '../utils/useQuizData'

const useFetchSavedItems = () => {
  const [savedItems, setSavedItems] = useState([])
  const [isPending, setIsPending] = useState(true)
  const { importItemById } = useQuizData()

  const fetchSavedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedItems')
      if (jsonValue !== null) {
        const parsedItems = JSON.parse(jsonValue)
        let items_ = []

        for (const id of parsedItems) {
          const item = importItemById(id)
          if (item !== null) items_.push(item)
          else {
          } //todo: usuń z pamięci id
        }

        setSavedItems(items_)
      }
      setIsPending(false)
    } catch (error) {
      console.error('Błąd podczas pobierania danych z AsyncStorage:', error)
    }
  }

  return { fetchSavedItems, savedItems, isPending }
}

export default useFetchSavedItems
