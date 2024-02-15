import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { topics } from '../../data/data'
import ModalComponent from '../components/ModalComponent'
import useImportQuiz from '../hooks/useImportQuiz'
import Card from '../components/Card'
import useModifyText from '../hooks/useModifyText'

export default function Topics({ route }) {
  const [categoryName, setCategoryName] = useState('')
  const [topicsToShow, setTopicsToShow] = useState([]) //all topics with one dummy topic at the beginning representing __All__
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenTopics, setChosenTopics] = useState([]) //topics that user want to take a quiz
  const importQuiz = useImportQuiz()
  const navigation = useNavigation()
  const modifyText = useModifyText()

  useEffect(() => {
    //Here a dummy topic is added
    const { categoryName } = route.params || {}
    if (categoryName && topics[categoryName]) {
      setCategoryName(categoryName)
      let name: string = categoryName + '__All__'
      setTopicsToShow([
        { name, image: 'https://reactjs.org/logo-og.png', des: '' },
        ...topics[categoryName],
      ])
    }
  }, [route.params])

  useEffect(() => {
    // Set all values of chosenTopics after closing and opening the modal to avoid bugs
    if (modalVisible) {
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
  }, [modalVisible])

  const showTheory = (topicName, categoryName) => {
    //@ts-ignore
    navigation.navigate('Theory', { topicName, categoryName })
  }

  //this function calls importQuiz and gives it an array of chosen topics
  const showQuiz = (topicsArray: Array<string>, categoryName) => {
    //jeśli topicName kończy się na "All" to wpierw otwórz modal, bo został wybrany tryb
    if (topicsArray[0].endsWith('__All__')) {
      setModalVisible(true)
      return
    }
    console.log(topicsArray)

    importQuiz(topicsArray, categoryName, topics)
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
      <Text>List of all topics for {modifyText(categoryName)}:</Text>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {topicsToShow.map(topic => (
          <Card
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
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
    // flex: 1
  },
  theoryBtn: {
    backgroundColor: 'lightblue',
    width: '100%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    elevation: 4, // Android
  },
  theoryText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    // width: '100%',
  },
})
