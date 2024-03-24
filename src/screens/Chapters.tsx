import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { chapters } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import RandomQuestion from '../components/ui/RandomQuestion'

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
