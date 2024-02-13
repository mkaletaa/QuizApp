import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList
} from 'react-native'
import Question from '../components/Question'
import Options from '../components/Options'
import Finish from '../components/Finish'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  
  // console.log("🚀 ~ Quiz ~ route:", route.params.quiz)
  const quiz = route.params.quiz
  const quizToIterate = [...quiz, { id: -1 }]

  let arrayOfResults = [] // This array stores user choices

  function compare(pressedOption, itemId) {
    for (let i = 0; i < quiz.length; i++) {
      if (quiz[i].id === itemId) {
        // Jeśli jeszcze nie ma obiektu w arrayOfResults dla danego pytania, dodaj go
        if (!arrayOfResults[i]) {
          arrayOfResults[i] = { id: itemId, userChoices: [] }
        }

        arrayOfResults[i].explanation = quiz[i].explanation
        // Sprawdź, czy pressedOption jest już w userChoices, jeśli tak, usuń go, jeśli nie, dodaj
        const index = arrayOfResults[i].userChoices.findIndex(
          choice => choice.id === pressedOption.id
        )

        if (pressedOption.isChosen) {
          // Jeśli pressedOption jest zaznaczone, ale jeszcze nie jest w userChoices, dodaj go
          if (index === -1) {
            arrayOfResults[i].userChoices.push(pressedOption)
          }
        } else {
          // Jeśli pressedOption nie jest zaznaczone, ale jest w userChoices, usuń go
          if (index !== -1) {
            arrayOfResults[i].userChoices.splice(index, 1)
          }
        }

        // Dodaj pole correctAnswer do arrayOfResults, jeśli jeszcze nie istnieje
        if (!arrayOfResults[i].correctAnswer) {
          arrayOfResults[i].correctAnswer = quiz[i].options
            .filter(answer => answer.correct)
            .map(correctAnswer => correctAnswer.id)
        }

        // Dodaj składnik isCorrect do arrayOfResults
        // Dodaj składnik isCorrect do arrayOfResults jako string "true" lub "false"
        arrayOfResults[i].isCorrect = (
          arrayOfResults[i].userChoices.length ===
            arrayOfResults[i].correctAnswer.length &&
          arrayOfResults[i].correctAnswer.every(correctId =>
            arrayOfResults[i].userChoices.some(
              choice => choice.id === correctId
            )
          )
        ).toString()

        // Wyświetl pytanie i wyniki
        console.log('question: ', quiz[i].question)
        console.log('userChoices: ', arrayOfResults[i].userChoices)
        console.log('correctAnswer: ', arrayOfResults[i].correctAnswer)
        console.log('isCorrect: ', arrayOfResults[i].isCorrect)

        break
      }
    }
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
            {item?.question ? (
              <Question question={item?.question} />
            ) : (
              <Finish userChoices={arrayOfResults} />
            )}

            {item?.options ? <Options item={item} fn={compare} /> : null}
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
