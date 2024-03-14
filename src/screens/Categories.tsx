import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  ScrollView,
  View
} from 'react-native'
import { categories } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import RandomQuestion from '../components/ui/RandomQuestion'

export default function Categories() {
  const navigation = useNavigation()

  const goToTopics = catName => {
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <RandomQuestion catName={"__All__"} />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        <StatusBar style="auto" />

        {categories?.map(category => (
          <Card
            catOrTop={'cat'}
            key={category.name}
            data={category}
            onCardPress={goToTopics}
            onCardLongPress={() => {}}
          />
        ))}

      </ScrollView>
    </View>
  )
}
