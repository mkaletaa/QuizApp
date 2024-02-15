import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  ScrollView,
} from 'react-native'
import Question from '../components/Question'
import Options from '../components/Options'
import Finish from '../components/Finish'
import { useHeaderHeight } from '@react-navigation/elements'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()

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
          <ScrollView
            contentContainerStyle={[
              styles.card,
              { width: screenWidth, minHeight: screenHeight - headerHeight },
            ]}
          >
            {item?.question ? (
              <Question question={item?.question}/>
            ) : (
              <Finish userChoices={arrayOfResults} />
            )}

            {item?.options ? <Options item={item} fn={compare} multiChoice={item.multiChoice} /> : null}
          </ScrollView>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
})
