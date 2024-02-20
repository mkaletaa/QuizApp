// import { useState } from 'react'
// import { Option, Item } from '../utils/types'

// type UseOptionPressReturnType = {
//   pressedButtons: Map<string, boolean>
//   setPressedButtons: React.Dispatch<React.SetStateAction<Map<string, boolean>>>
//   handleOptionPress: (pressedOption: Option, multiChoice: boolean) => void
// }

// export const useOptionPress = (
//   item: Item,
//   createResultsArray: (pressedOption: Option, item_id: string) => void
// ): UseOptionPressReturnType => {
//   const [pressedButtons, setPressedButtons] = useState(
//     new Map<string, boolean>()
//   )

//   function handleOptionPress(
//     pressedOption: Option,
//     multiChoice: boolean
//   ): void {
//     //if this option has already been chosen, unchoose it
//     if (pressedOption.isMarked) {
//       // console.log('pressedOptoin 1: ', pressedOption)
//       pressedOption.isMarked = false
//       setPressedButtons(prevState => {
//         const newMap = new Map(prevState)
//         newMap.set(pressedOption.id, false)
//         return newMap
//       })
//       createResultsArray(pressedOption, item.id)
//       return
//     }

//     if (multiChoice && !pressedOption.isMarked) {
//       pressedOption.isMarked = true

//       setPressedButtons(prevState => {
//         const newMap = new Map(prevState)
//         newMap.set(pressedOption.id, true)
//         return newMap
//       })
//       createResultsArray(pressedOption, item.id)
//       return
//     }

//     if (!multiChoice && !pressedOption.isMarked) {
//       // console.log('pressedOptoin 3: ', pressedOption)
//       for (const option of item.options) {
//         option.isMarked = false
//       }
//       pressedOption.isMarked = true

//       //ustaw wszystkie wartości na false
//       setPressedButtons(prevState => {
//         const newMap = new Map(prevState)

//         // Ustaw wszystkie wartości na false
//         newMap.forEach((value, key) => {
//           newMap.set(key, false)
//         })

//         // Ustaw konkretny klucz na true
//         newMap.set(pressedOption.id, true)

//         return newMap
//       })
//       createResultsArray(pressedOption, item.id)
//       return
//     }
//   }

//   return { pressedButtons, setPressedButtons, handleOptionPress }
// }
