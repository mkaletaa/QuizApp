import { View } from 'react-native'
import ContentRenderer from '../ContentRenderer/_ContentRenderer'
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
        backgroundColor: 'white',
        borderColor: 'mint',
        // borderWidth: 1.5,
        borderRadius: 10,
        padding: 5,
        // maxHeight: 100,
        overflow: 'hidden',
        elevation: 9,
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
        colors={['#F6F0C4', '#D99EC9']}
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
