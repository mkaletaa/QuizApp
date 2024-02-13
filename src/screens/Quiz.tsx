import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import { quiz } from '../../data/quiz/quiz'
import Question from '../components/Question'

export default function Quiz({ route }) {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  return (
    <FlatList
      data={quiz}
      horizontal
      pagingEnabled // Ustawienie, które zapewnia efekt "oporu"
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[styles.card, { width: screenWidth, height: screenHeight }]}
        >
          <Question prop={item.question}/>
          {item.answers.map(answer => (
            <View key={answer.id} style={styles.answerContainer}>
              <Text>{answer.answer}</Text>
            </View>
          ))}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  answerContainer: {
    marginTop: 10,
  },
})
