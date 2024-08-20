import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'

import { importItemById } from '../utils/getQuizData'
import { Item } from '../utils/types'
import { getValue } from '../utils/utilStorage'

const useFetchSavedItems = () => {
  const [savedItems, setSavedItems] = useState<Item[]>([])
  const [isPending, setIsPending] = useState(true) //are items still being retrieved from the memory

  const fetchSavedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedItems')

      if (jsonValue !== null) {
        const parsedItems = JSON.parse(jsonValue)
        let items_ = []
        for (const id of parsedItems) {
          const item = importItemById(id)
          if (item !== null) items_.push(item)
        }

        getValue('savedItems')
        setSavedItems(items_)
      }
      setIsPending(false)
    } catch (error) {
      console.error('Error while getting data from AsyncStorage:', error)
    }
  }

  return { fetchSavedItems, savedItems, isPending }
}

export default useFetchSavedItems
