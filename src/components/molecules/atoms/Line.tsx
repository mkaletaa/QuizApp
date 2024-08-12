import { Dimensions, StatusBar, View } from 'react-native'
import { setColor } from '../../../utils/functions'
import { Result } from '../../../utils/types'

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
