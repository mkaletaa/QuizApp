import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Modal,
} from 'react-native'
import { categories } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import ModalComponent from '../components/ModalComponent'
import useQuizData from '../hooks/useQuizData'
import Stats from '../components/Stats'
import { AntDesign } from '@expo/vector-icons'
import RandomQuestion from '../components/ui/RandomQuestion'

export default function Categories() {
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const navigation = useNavigation()
  const [showStats, setShowStats] = useState(false)
  const [chosencategories, setChosencategories] = useState([])
  const { getAllTopics, getTopicsForCategory } = useQuizData()

  useEffect(() => {
    setShowStats(false)
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      setCategoriesToShow([...categories])
    }
  }, [])

  const goToTopics = catName => {
    setShowStats(false)

    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }


  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
        <RandomQuestion />
      <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
        <StatusBar style="auto" />


        {categories?.map(category => (
          <Card
            catOrTop={'cat'}
            key={category.name}
            data={category}
            onCardPress={goToTopics}
            onCardLongPress={() => setShowStats(true)}
          />
        ))}

        {showStats && (
          <Stats //todo: dokończyć
            key_={'cat_1'}
            catOrTop={'cat'}
            onClose={() => setShowStats(false)}
          />
        )}
      </ScrollView>
    </View>
  )
}
