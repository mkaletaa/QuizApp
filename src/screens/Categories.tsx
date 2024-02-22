import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
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
  const {getAllTopics, getTopicsForCategory} = useQuizData()

  useEffect(() => {
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      let name: string = '__All__'
      setCategoriesToShow([{ name },...categories])
    }
  }, [])

  const goToTopics = (catName) => {
    if (catName==='__All__') {

      // let topArray = 
      //todo dla kazdej kategorii pobierz jej topiki i włóż do jednej tablicy
      //@ts-ignore
      navigation.navigate('Quiz', {
        catName: '__All__',
        topArray: getTopicsForCategory('cat_1'),
        howManyItems: Infinity,
        shuffle: true
      })
      return
    }
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }




  return (
    <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
      <StatusBar style="auto" />
      {categoriesToShow?.map(category => (
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
