import React, { useEffect, useState } from 'react'
// import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native'
import Question from '../components/Question'
import Options from '../components/Options'
import Finish from '../components/Finish'
import { useHeaderHeight } from '@react-navigation/elements'
import { BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()
  const navigation = useNavigation()
  // console.log("🚀 ~ Quiz ~ route:", route.params.quiz)
  const itemSet = route.params.quiz
  const quizToIterate = [...itemSet, { id: -1 }]
  const [modalVisible, setModalVisible] = useState(false)
  // let results = [] // This array stores user choices
  const [results, setResults] = useState([]) //same as results but as a state

  useEffect(() => {
    console.log('rerender')
    for (const item of itemSet) {
      //dodaj obiekt {id: item.id, userChoices: []}
      setResults(prev => [...prev, { id: item.id, userChoices: [] }])
    }
  }, [])

  useEffect(() => {
    console.log('results: ', JSON.stringify(results))
  }, [results])


  /* funkcja przyjmuje id itema oraz naciśniętą opcję 
(niezależnie czy została naciśnięta w celu zaznaczenia czy odznaczenia) */
  function compare(pressedOption, itemId) {
    for (let i = 0; i < itemSet.length; i++) {
      if (itemSet[i].id === itemId) {
        // console.log("🚀 ~ compare ~ quiz:", quiz[i].id)
        // console.log("🚀 ~ compare ~ itemId:", itemId, )

        if (!itemSet[i].multiChoice) {
          //w przypadku pytań jednokrotnego wyboru:
          if (results[i]?.userChoices?.length === 0) {
            console.log('nie było nic jeszcze zaznaczone')
            //jeli nie udzielono jeszcze odpowiedzi na to pytanie, dodaj ją do arrayOfResults
            // results[i].userChoices.push(pressedOption)
            let results2 = [...results]
            results2[i].userChoices.push(pressedOption)
            setResults(results2)
          } else {
            console.log('coś było juz zaznazone i...')

            //jeśli już ucoś było zaznaczone
            if (pressedOption.isChosen) {
              //jeśli zaznaczono inną odpowiedź
              console.log('...zaznaczono inną odpowiedź')

              // results[i].userChoices.pop() //pozbądź się starej odpowiedzi
              // results[i].userChoices.push(pressedOption) //dodaj zaktualizowaną odpowiedź
              let results2 = [...results]
              results2[i].userChoices = [pressedOption]
              setResults(results2)
            } else {
              console.log('...odznaczono odpowiedź')

              //jeśli odznaczono istniejącą odpowiedź
              // results[i].userChoices.pop() //pozbądź się starej odpowiedzi
              let results2 = [...results]
              results2[i].userChoices = []
              setResults(results2)
            }
          }
          // setResults(results)
          return
        }

        //jeśli pytanie jest wielokrotnego wyboru:
        if (results[i].userChoices.length === 0) {
          console.log('nie było nic jeszcze zaznaczoneeeee')
          //jeli nie udzielono jeszcze odpowiedzi na to pytanie, dodaj ją do arrayOfResults
          // results[i].userChoices.push(pressedOption)\
          let results2 = [...results]
          results2[i].userChoices.push(pressedOption)
          console.log("🚀 ~ compare ~ results2:", results2)
          setResults(results2)
        } else {
          //jeśli już udzielono odpowiedzi
          console.log('coś było juz zaznazone i...')
          if (pressedOption.isChosen) {
            console.log('...zaznaczono inną odpowiedź')
            let results2 = [...results]
            results2[i].userChoices.push(pressedOption)
            //jeśli zaznaczono inną odpowiedź

            setResults(results2)
            // arrayOfResults[i].userChoices.filter //pozbądź się starej odpowiedzi
            // results[i].userChoices?.push(pressedOption) //dodaj zaktualizowaną odpowiedź
          } else {
            console.log('...odznaczono odpowiedź')
            //jeśli odznaczono istniejącą odpowiedź pozbądź się starej odpowiedzi
            let results2 = [...results]
            results2[i].userChoices = results2[i].userChoices.filter(
              option => option.id !== pressedOption.id
            )
            setResults(results2)
          }
        }

        // setResults(results)

        break
      }
    }
  }

  // useEffect(() => {
  //   const handleBackPress = () => {
  //     setModalVisible(true)
  //     return true
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackPress
  //   )
  //   console.log('first')
  //   return () => backHandler.remove()
  // }, [navigation])

  function closeModalAndGoBack(): void {
    setModalVisible(false)
    navigation.goBack() // powrót do poprzedniego ekranu
  }

  return (
    <View>
      <FlatList
        data={quizToIterate}
        horizontal
        pagingEnabled
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView
            contentContainerStyle={[
              styles.card,
              { width: screenWidth, minHeight: screenHeight - headerHeight },
            ]}
          >
            {item?.question ? (
              <Question question={item?.question} />
            ) : (
              <Finish userChoices={results} nrOfItems={itemSet.length} />
            )}

            {item?.options ? (
              <Options
                item={item}
                fn={compare}
                multiChoice={item.multiChoice}
              />
            ) : null}
          </ScrollView>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={false} //modalVisible
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{ textAlign: 'center', fontSize: 15, marginBottom: 10 }}
            >
              Are you sure you want to go back? Your progress won't be saved
            </Text>
            <View style={styles.buttonsContainer}>
              <Button
                title="yes, quit the quiz"
                color="red"
                onPress={closeModalAndGoBack}
              />
              <Button
                title="nah, I want to stay here"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgray',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  button: {
    fontSize: 10,
  },
})
