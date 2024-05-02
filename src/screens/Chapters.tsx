import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { chapters } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import RandomQuestion from '../components/ui/RandomQuestion'
import { LinearGradient } from 'expo-linear-gradient'

export default function Chapters() {
  const navigation = useNavigation()

  const goToTopics = chapName => {
    // @ts-ignore
    navigation.navigate('Topics', { chapterName: chapName })
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <LinearGradient
        // Button Linear Gradient
        colors={['#EC9F05', '#FF4E00']}
        start={{ x: 0, y: .6 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: '100%',
          height: '100%', //has to be 100% cuz if Math component, Tile cannot be pressed
          position: 'absolute',
          bottom: 0,
          // opacity: .8
          // transform: [{ rotate: '25deg' }], // Obrót gradientu o 45 stopni
        }}
      ></LinearGradient>
      <RandomQuestion chapName={'__All__'} />
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
