import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Button } from 'react-native'
import { quiz } from '../../data/quiz/quiz'
import Question from '../components/Question'
import Answers from '../components/Answers'
import Finish from '../components/Finish'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const quizToIterate = [
    ...quiz,
    {
      id: -1,
      // componentType: 'result'
      // question: 'hh',
      // answers: [
      // ],
    },
  ]

  function compare(data) {
    // console.log("🚀 ~ manipulate ~ data:", data)
    // console.log(quizToIterate)
  }

  return (
    <View>
      <FlatList
        data={quizToIterate}
        horizontal
        pagingEnabled 
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[styles.card, { width: screenWidth, height: screenHeight }]}
          >
            {item?.question ? <Question question={item?.question} /> : <Finish/> }

            {item?.answers ? <Answers item={item} fn={compare}/> : null}


          </View>
        )}
      />

      {/* <View style={styles.buttonContainer}>
        <Button title="dede" style={styles.button} onPress={()=>onPress()}></Button>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  // buttonContainer: {
  //   position: 'absolute',
  //   bottom: 20, // Dostosuj do preferowanej odległości od dołu
  //   left: 20, // Dostosuj do preferowanej odległości od lewej
  //   right: 20, // Dostosuj do preferowanej odległości od prawej
  // },
  // button: {
  //   width: '100%',
  // },
})
