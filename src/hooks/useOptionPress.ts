import { useState } from 'react'
import {Option} from '../utils/types'

export const useOptionPress = (item, createResultsArray) => {

  const [pressedButtons, setPressedButtons] = useState(
    new Map<string, boolean>()
  )

  function handleOptionPress(pressedOption: Option, multiChoice: boolean): void {
    //if this option has already been chosen, unchoose it
    if (pressedOption.isChosen) {
      // console.log('pressedOptoin 1: ', pressedOption)
      pressedOption.isChosen = false
      setPressedButtons(prevState => {
        const newMap = new Map(prevState)
        newMap.set(pressedOption.id, false)
        return newMap
      })
      createResultsArray(pressedOption, item.id)
      return
    }

    if (multiChoice && !pressedOption.isChosen) {
      pressedOption.isChosen = true

      setPressedButtons(prevState => {
        const newMap = new Map(prevState)
        newMap.set(pressedOption.id, true)
        return newMap
      })
      createResultsArray(pressedOption, item.id)
      return
    }

    if (!multiChoice && !pressedOption.isChosen) {
      // console.log('pressedOptoin 3: ', pressedOption)
      for (const option of item.options) {
        option.isChosen = false
      }
      pressedOption.isChosen = true

      //ustaw wszystkie wartości na false
      setPressedButtons(prevState => {
        const newMap = new Map(prevState)

        // Ustaw wszystkie wartości na false
        newMap.forEach((value, key) => {
          newMap.set(key, false)
        })

        // Ustaw konkretny klucz na true
        newMap.set(pressedOption.id, true)

        return newMap
      })
      createResultsArray(pressedOption, item.id)
      return
    }
  }

  return {pressedButtons, setPressedButtons, handleOptionPress}
}
