import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet
} from 'react-native'
import { categories } from '../../data/data'
import Card from '../components/Card'

export default function Categories() {
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      let name: string = '__All__'
      setCategoriesToShow([...categories])
      // setCategoriesToShow(categories)
    }
  }, [])


  const goToTopics = catName => {
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      {categoriesToShow?.map(category => (
        <Card
          key={category.name}
          data={category}
          // showQuiz={() => {}}
          goToTopics={goToTopics}
        />
      ))}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    // backgroundColor: '#fffbbb',
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
  }
})
