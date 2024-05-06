import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { chapters } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import RandomQuestionButton from '../components/molecules/atoms/RandomQuestionButton'
import { LinearGradient } from 'expo-linear-gradient'
// import { Canvas, Patch, vec, Oval, Blur } from '@shopify/react-native-skia'
import { screenBackground } from '../utils/constants'
import Gradient from '../components/molecules/Gradient'

export default function Chapters() {
  const navigation = useNavigation()

  const goToTopics = chapName => {
    // @ts-ignore
    navigation.navigate('Topics', { chapterName: chapName })
  }

  const colors = ['#61dafb', '#fb61da', '#61fbcf', '#dafb61']
  const width = 360
  const height = 600
  // const topLeft = { pos: vec(0, 0), c1: vec(0, 0), c2: vec(width, 0) }
  // const topRight = {
  //   pos: vec(width, 0),
  //   c1: vec(width, height),
  //   c2: vec(width, 0),
  // }
  // const bottomRight = {
  //   pos: vec(width, height),
  //   c1: vec(width, height),
  //   c2: vec(width, height),
  // }
  // const bottomLeft = {
  //   pos: vec(0, height),
  //   c1: vec(0, height),
  //   c2: vec(width, height),
  // }

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: screenBackground,
      }}
    >
      <Gradient/>

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
