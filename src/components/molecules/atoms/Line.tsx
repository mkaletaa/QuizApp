import { View, Dimensions } from 'react-native'
import { Result } from '../../../utils/types'
import { setColor } from '../../../utils/functions'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useHeaderHeight } from '@react-navigation/elements'
import { StatusBar } from 'react-native'

export default function Line({
  resultsArray,
  allItemsCount,
}: {
  resultsArray: Array<Result>
  allItemsCount: number
}) {
  // const headerHeight = useHeaderHeight()
  const screenWidth = Dimensions.get('window').width

  return (
    // <SafeAreaView>
    <View
      style={{
        height: 5,
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        position: 'absolute',
        top: StatusBar.currentHeight,
        zIndex: 2,
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
    // {/* </SafeAreaView> */}
  )
}
