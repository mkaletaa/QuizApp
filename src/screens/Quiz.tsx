import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import { quiz } from '../../data/quiz/quiz'
import Question from '../components/Question'
import Answers from '../components/Answers'

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
          <Answers answers={item.answers}/>
          
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
  }
})
