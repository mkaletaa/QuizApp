import { View } from 'react-native'
import ContentRenderer from '../ContentRenderer/_ContentRenderer'
import { LinearGradient } from 'expo-linear-gradient'
import { Surface } from 'react-native-paper'
import { gradient, surfaceBg, surfaceBorder1, surfaceBorder2, surfaceShadow } from '../../utils/constants'
import Gradient from './Gradient'

export default function ChapterDescription({
  chapterDescription: chapterDes,
}: {
  chapterDescription: string
}) {
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: surfaceBg,
        // borderLeftColor: surfaceBorder1,
        // borderBottomColor: surfaceBorder1,
        // borderRightColor: surfaceBorder2,
        // borderTopColor: surfaceBorder2,
        // borderColor: "#dfdfdf",
        // borderWidth: 1.5,
        elevation: 2,
        borderRadius: 10,
        padding: 5,
        // maxHeight: 100,
        overflow: 'hidden',
        marginVertical: 20,
      }}
    >
      <View
        style={{
          zIndex: 1,
        }}
      >
        <ContentRenderer content={chapterDes} />
      </View>
      {/* <Gradient></Gradient> */}
      {/* <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["red", 'transparent']}
        style={{
          width: '110%',
          height: '20%', //has to be 100% cuz if Math component, Tile cannot be pressed
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      ></LinearGradient> */}
    </View>
  )
}
