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

  const screenWidth = Dimensions.get('window').width
  function instantQuestion() {
    //@ts-ignore
    navigation.navigate('Quiz', {
      catName: '__All__',
      topArray: [],
      howManyItems: Infinity,
      shuffle: true,
    })
    setShowStats(false)
    return
  }
  return (
    <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
      <StatusBar style="auto" />
      <Pressable
        onPress={instantQuestion}
        style={{
          width: screenWidth / 2.4,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          elevation: 3,
          borderRadius: 3,
          height: 40,
          justifyContent: 'center',
          marginTop: 40,
          marginRight: 15
          // backgroundColor: 'blue'
        }}
      >
        <Text style={{ fontSize: 15 }}>random question</Text>
      </Pressable>

      <Text style={{ fontSize: 30 }}> </Text>
      <Pressable
        //@ts-ignore
        onPress={() => navigation.navigate('Saved')}
        style={{
          width: screenWidth / 2.4,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          elevation: 3,
          borderRadius: 3,
          // padding: 5,
          height: 40,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          // backgroundColor: 'blue'
        }}
      >
        <AntDesign name="star" size={24} color="black" />
        <Text style={{ fontSize: 18 }}>saved</Text>
      </Pressable>

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
  )
}
