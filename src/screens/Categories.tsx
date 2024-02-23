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
} from 'react-native'
import { categories } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import ModalComponent from '../components/ModalComponent'
import useQuizData from '../hooks/useQuizData'

export default function Categories() {
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [chosencategories, setChosencategories] = useState([])
  const { getAllTopics, getTopicsForCategory } = useQuizData()

  useEffect(() => {
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      setCategoriesToShow([...categories])
    }
  }, [])

  const goToTopics = catName => {
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

  const screenWidth = Dimensions.get('window').width
  function instantQuestion() {
    //@ts-ignore
    navigation.navigate('Quiz', {
      catName: '__All__',
      topArray: [],
      howManyItems: Infinity,
      shuffle: true,
    })
    return
  }
  return (
    <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
      <StatusBar style="auto" />
      <Pressable
        onPress={instantQuestion}
        style={{
          width: screenWidth,
          backgroundColor: 'red',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 30 }}>instant question</Text>
      </Pressable>

      <Text style={{ fontSize: 30 }}>{' '}</Text>
      <Pressable
      //@ts-ignore
        onPress={() => navigation.navigate('Saved')}
        style={{
          width: screenWidth,
          backgroundColor: 'red',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 30 }}>saevd</Text>
      </Pressable>

      {categories?.map(category => (
        <Card
          catOrTop={'cat'}
          key={category.name}
          data={category}
          onCardPress={goToTopics}
        />
      ))}
    </ScrollView>
  )
}
