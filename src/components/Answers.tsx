import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const option = (answer, fn, item) => {
  const { componentType, props, answer: answerValue } = answer

function handlePress(pressedOption) {
  if (pressedOption.hasOwnProperty('isChosen')) {
    // Jeśli klucz 'chosen' istnieje w obiekcie data, zmień jego wartość na przeciwną
    pressedOption.isChosen = !pressedOption.isChosen
  } else {
    // Jeśli klucz 'chosen' nie istnieje, dodaj go z wartością true
    pressedOption.isChosen = true
  }

  // console.log('🚀 ~ handlePress ~ data:', answer)
  // console.log('🚀 ~ handlePress ~ prop', item.id)

  // Wywołaj funkcję przekazaną jako fn z argumentem data
  fn(pressedOption)
}


  switch (componentType) {
    case 'Text':
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          {...props}
          style={styles.touchableOpacity}
          onPressOut={() => handlePress(answer)}
        >
          <Text style={styles.buttonText}>{answerValue} dddg</Text>
        </TouchableOpacity>
      )

    default:
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          {...props}
          style={styles.touchableOpacity}
          onPressOut={() => handlePress(answer)}
        >
          <Text style={styles.buttonText}>{answerValue}</Text>
        </TouchableOpacity>
      )
  }
}

export default function Answers({ item, fn }) {
  return (
    <View>
      {item.answers.map(answer => (
        <View key={answer.id} style={styles.answerContainer}>
          {option(answer, fn, item)}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    marginTop: 10,
  },
  touchableOpacity: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    width: 200,
    // Dodaj style dla komponentu Text
  },
})
