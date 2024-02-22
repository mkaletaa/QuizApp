import { View, Dimensions } from 'react-native'
import { Result } from '../utils/types'

export default function Line({
  resultsArray,
  allItemsCount,
}: {
  resultsArray: Array<Result>
  allItemsCount: number
}) {
      const screenWidth = Dimensions.get('window').width

      function setColor(result: Result): 'green' | 'red' | 'orange' {
        if (result.isCorrect === 'correct') return 'green'
        if (result.isCorrect === 'incorrect') return 'red'
        if (result.isCorrect === 'kindof') return 'orange'
      }

  return (
    <View
      style={{
        height: 5,
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
      }}
      >
      {resultsArray?.map(result => (
        <View
        style={{
          width: allItemsCount === 0 ? 0 : screenWidth / allItemsCount,
          backgroundColor: setColor(result),
          height: 5,
          // zIndex: 10
          }}
        ></View>
      ))}
    </View>
  )
}
