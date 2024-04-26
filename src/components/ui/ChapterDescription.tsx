import { View } from 'react-native'
import ContentRenderer from '../ContentRenderer'
import { LinearGradient } from 'expo-linear-gradient'

export default function ChapterDescription({
  chapterDescription: chapterDes,
}: {
  chapterDescription: string
}) {
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: 'rgba(146,218,232,255)',
        borderColor: '#34a1be',
        borderWidth: 1.5,
        borderRadius: 5,
        padding: 5,
        // maxHeight: 100,
        overflow: 'hidden',
      }}
    >
      <ContentRenderer content={chapterDes} />
      {/* <LinearGradient
        colors={['transparent', 'rgba(176,238,252,255)']}
        style={{
          width: '110%',
          height: 50, //has to be 100% cuz if Math component, Tile cannot be pressed
          position: 'absolute',
          bottom: 0,
        }}
      ></LinearGradient> */}
    </View>
  )
}
