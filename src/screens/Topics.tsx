import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { topics } from '../../data/data'
import Card from '../components/Card'
import ModalComponent from '../components/ModalComponent'
import useImportQuiz from '../hooks/useImportQuiz'
// import Quiz from './Quiz2'
// import { removeUnderscores } from '../utils/modifyText'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics plus __All__
  const [showModal, setShowModal] = useState(false)
  const [chosenTopics, setChosenTopics] = useState([]) //topics that user want to take a quiz
  const importQuiz = useImportQuiz()
  const navigation = useNavigation()

  useEffect(() => {
    //Here a dummy topic is added
    const categoryName: string = route.params.categoryName
    const categoryDescription: string = route.params.categoryDescription
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      let name: string = categoryName + '__All__'
      setTopicsToShow([
        { name, image: 'https://reactjs.org/logo-og.png' },
        ...topics[categoryName],
      ])
    }
  }, [route.params])

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (showModal) {
      const updatedChosenTopics = []

      Object.keys(topics).forEach(category => {
        topics[category].forEach(topic => {
          if (category === categoryName) {
            updatedChosenTopics.push(topic.name)
          }
        })
      })

      setChosenTopics(updatedChosenTopics)
    } else {
      setChosenTopics([])
    }
  }, [showModal])

  const showTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (topicsArray: string[], categoryName: string): void => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (topicsArray[0].endsWith('__All__')) {
      setShowModal(true)
      return
    }
    // console.log(topicsArray)
    console.log('🚀 ~ showQuiz ~ topicsArray:', topics)

    // importQuiz(topicsArray, categoryName)

    let catTopArray = [
      {
        [categoryName]: [...topicsArray],
      }
    ]
    


    //@ts-ignore
    navigation.navigate('Quiz', {catTopArray, topArray: topicsArray, catArray: [categoryName] })
  }

  function toggleTopic(name: string, isChosen: boolean): void {
    setChosenTopics(prevChosenTopics => {
      if (!isChosen) {
        // Dodaj name do tablicy, jeśli isChosen jest true
        return prevChosenTopics.concat(name)
      } else {
        // Usuń name z tablicy, jeśli isChosen jest false
        return prevChosenTopics.filter(topic => topic !== name)
      }
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {topicsToShow.map(topic => (
          <Card
            key={topic.name}
            data={topic}
            showQuiz={() => showQuiz([topic.name], categoryName)}
          >
            {!topic.name.endsWith('__All__') ? (
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.theoryBtn}
                onPress={() => showTheory(topic.name, categoryName)}
              >
                <Text style={styles.theoryText}>Learn</Text>
              </TouchableOpacity>
            ) : null}
          </Card>
        ))}
      </ScrollView>

      <ModalComponent
        modalVisible={showModal}
        setModalVisible={setShowModal}
        dataToIterate={topics[categoryName]}
        toggleTopic={toggleTopic}
        showQuiz={() => showQuiz(chosenTopics, categoryName)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  theoryBtn: {
    backgroundColor: 'lightblue',
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    elevation: 4,
  },
  theoryText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
