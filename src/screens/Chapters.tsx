import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { chapters } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import RandomQuestionButton from '../components/ui/RandomQuestionButton'
import { LinearGradient } from 'expo-linear-gradient'
import { Canvas, Patch, vec, Oval, Blur } from '@shopify/react-native-skia'

export default function Chapters() {
  const navigation = useNavigation()

  const goToTopics = chapName => {
    // @ts-ignore
    navigation.navigate('Topics', { chapterName: chapName })
  }

  const colors = ['#61dafb', '#fb61da', '#61fbcf', '#dafb61']
  const width = 360
  const height = 600
  const topLeft = { pos: vec(0, 0), c1: vec(0, 0), c2: vec(width, 0) }
  const topRight = {
    pos: vec(width, 0),
    c1: vec(width, height),
    c2: vec(width, 0),
  }
  const bottomRight = {
    pos: vec(width, height),
    c1: vec(width, height),
    c2: vec(width, height),
  }
  const bottomLeft = {
    pos: vec(0, height),
    c1: vec(0, height),
    c2: vec(width, height),
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      {/* <LinearGradient
        // Button Linear Gradient
        colors={['rgba(238, 130, 238, .2)', 'transparent']}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: '100%',
          height: '100%', //has to be 100% cuz if Math component, Tile cannot be pressed
          position: 'absolute',
          bottom: 0,
        }}
      ></LinearGradient> */}

      <Canvas
        style={{
          width: 360,
          height: 600,
          position: 'absolute',
          bottom: 0,
        }}
      >
        <Oval
          x={-100}
          y={450}
          width={396}
          height={228}
          color="purple"
          opacity={0.07}
        />
        <Oval
          x={300}
          y={150}
          width={496}
          height={228}
          color="yellow"
          opacity={0.09}
        />
        {/* <Patch
          colors={colors}
          patch={[topLeft, topRight, bottomRight, bottomLeft]}
        /> */}
        <Blur blur={34} />
      </Canvas>

      <RandomQuestionButton chapName={'__All__'} />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        <StatusBar style="auto" />

        {chapters?.map(chapter => (
          <Card
            chapOrTop={'cat'}
            key={chapter.name}
            data={chapter}
            onCardPress={goToTopics}
            onCardLongPress={() => {}}
          />
        ))}
      </ScrollView>
    </View>
  )
}
