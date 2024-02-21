import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { categories } from '../../data/data'
import Card from '../components/Card'
import utilStyles from '../utils/styles'
import ModalComponent from '../components/ModalComponent'

export default function Categories() {
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [chosencategories, setChosencategories] = useState([])
  useEffect(() => {
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      let name: string = '__All__'
      setCategoriesToShow([{ name },...categories])
      // setCategoriesToShow(categories)
    }
  }, [])

  const goToTopics = (catName) => {
    if (catName==='__All__') {
      showQuiz([catName])
      return
    }
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

    const showQuiz = (
    catArray: string[],
    howManyItems: number | null = null
  ): void => {  
    // console.log("🚀 ~ Categories ~ catArray:", catArray)
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    
    if (catArray[0]==='__All__') {
      setShowModal(true)
      return
    }

    //@ts-ignore
    navigation.navigate('Quiz', {
      catArray,
      // categoryName,
      howManyItems,
    })
  }

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (showModal) {
      const updatedChosenCategories = []

      //TODO: włóż wszystkie kategorie
      // Object.keys(topics).forEach(category => {
      //   topics[category].forEach(topic => {
      //     if (category === categoryName) {
      //       updatedChosenCategories.push(topic.name)
      //     }
      //   })
      // })

      setChosencategories(updatedChosenCategories)
    } else {
      setChosencategories([])
    }
  }, [showModal])

  function toggleTopic(catName: string, isChosen: boolean): void {
    console.log('toggle', catName)
    setChosencategories(prevChosenTopics => {
      if (!isChosen) {
        // Dodaj name do tablicy, jeśli isChosen jest true
        return prevChosenTopics.concat(catName)
      } else {
        // Usuń name z tablicy, jeśli isChosen jest false
        return prevChosenTopics.filter(topic => topic !== catName)
      }
    })
  }

  return (
    <ScrollView contentContainerStyle={utilStyles.scrollViewCardContainer}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      {categoriesToShow?.map(category => (
        <Card
          catOrTop={'cat'}
          key={category.name}
          data={category}
          onCardPress={goToTopics}
          // showQuiz={goToTopics}
        />
      ))}

      <ModalComponent
        dataToIterate={categories}
        modalVisible={showModal}
        setModalVisible={setShowModal}
        toggleTopic={toggleTopic}
        showQuiz={()=>{showQuiz(chosencategories)}}
      ></ModalComponent>
    </ScrollView>
  )
}
