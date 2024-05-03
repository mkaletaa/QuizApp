import { View } from 'react-native'
import ContentRenderer from '../ContentRenderer/_ContentRenderer'
import { LinearGradient } from 'expo-linear-gradient'
import { Surface } from 'react-native-paper'
import { surfaceBg, surfaceBorder1, surfaceBorder2, surfaceShadow } from '../../utils/constants'

export default function ChapterDescription({
  chapterDescription: chapterDes,
}: {
  chapterDescription: string
}) {
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: 'white',
        borderLeftColor: surfaceBorder1,
        borderBottomColor: surfaceBorder1,
        borderRightColor: surfaceBorder2,
        borderTopColor: surfaceBorder2,
        // borderWidth: 1.5,
        borderRadius: 10,
        padding: 5,
        // maxHeight: 100,
        overflow: 'hidden',
        elevation: 3,
        marginVertical: 20
      }}
    >
      <View
        style={{
          zIndex: 1,
        }}
      >
        <ContentRenderer content={chapterDes} />
      </View>
      <LinearGradient
        start={{ x: 0, y: 0.7 }}
        end={{ x: 1, y: 0 }}
        colors={[surfaceShadow, surfaceBg]}
        style={{
          width: '110%',
          height: '100%', //has to be 100% cuz if Math component, Tile cannot be pressed
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      ></LinearGradient>
    </View>
  )
}
