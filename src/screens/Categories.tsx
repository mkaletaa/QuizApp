import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Modal, StyleSheet, Text, View , Image, ScrollView, useWindowDimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { categories, topics } from '../../data/data'
import QuizModalSwitch from '../components/QuizModalSwitch'
import useImportQuiz from '../hooks/useImportQuiz'
import ModalComponent from '../components/ModalComponent'
import Card from '../components/Card'

export default function Categories() {
  const [categoriesToShow, setCategoriesToShow] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenCategories, setChosenCategories] = useState([]) //topics that user want to take a quiz
  const importQuiz = useImportQuiz()
  const navigation = useNavigation()


  useEffect(() => {
    if (categories.length === 1)
      // @ts-ignore
      navigation.navigate('Topics', { categoryName: categories[0].name })
    else {
      let name: string = '__All__'
      setCategoriesToShow([
        { name, image: 'https://reactjs.org/logo-og.png', des: '' },
        ...categories,
      ])
      // setCategoriesToShow(categories)
    }
  }, [])

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (modalVisible) {
      const updatedChosenCats = []
      categories.map(cat => updatedChosenCats.push(cat.name))
      setChosenCategories(updatedChosenCats)
    } else {
      setChosenCategories([])
    }
  }, [modalVisible])

  const goToTopics = catName => {
    // @ts-ignore
    navigation.navigate('Topics', { categoryName: catName })
  }

  function toggleTopic(name: string, isChosen: boolean): void {
    setChosenCategories(prevChosenTopics => {
      if (!isChosen) {
        // Dodaj name do tablicy, jeśli isChosen jest true
        return prevChosenTopics.concat(name)
      } else {
        // Usuń name z tablicy, jeśli isChosen jest false
        return prevChosenTopics.filter(topic => topic !== name)
      }
    })
  }

  const showQuiz = (categoriesArray: Array<string>) => {
    console.log('🚀 ~ showQuiz ~ categoriesArray:', categoriesArray)
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (categoriesArray[0].endsWith('__All__')) {
      setModalVisible(true)
      return
    }

    let itemsArray = []
    
    chosenCategories.map(cat => {
      // let topicsArray = []
      // topicsArray.push([...topics[cat]])
      topics[cat].map(topic => {
        itemsArray.push(...importQuiz([topic.name], cat, true))
        
        })
        
        // console.log( JSON.stringify(importQuiz(topicsArray, cat.name, topics, true)))
      })

        // console.log("🚀 ~ showQuiz ~ itemsArray:",  JSON.stringify(str))
    //@ts-ignore
    navigation.navigate('Quiz', { quiz: itemsArray, topicName: 'headerText' })
  }

  const windowWidth = useWindowDimensions().width

  return (

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <StatusBar style="auto" />
        {categoriesToShow?.map(category => (
          <Card data={category} showQuiz={()=>showQuiz([category.name])} goToTopics={goToTopics}></Card>
        ))}

        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          dataToIterate={categories}
          toggleTopic={toggleTopic}
          showQuiz={() => showQuiz(chosenCategories)}
        />
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
})
