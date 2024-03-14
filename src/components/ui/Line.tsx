import { View, Dimensions } from 'react-native'
import { Result } from '../../utils/types'
import {setColor} from '../../utils/functions'

export default function Line({
  resultsArray,
  allItemsCount,
}: {
  resultsArray: Array<Result>
  allItemsCount: number
}) {
  const screenWidth = Dimensions.get('window').width



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
