import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const optionComponent = (option, fn, item) => {
  const { componentType, props, answer: answerValue } = option

  function handlePress(pressedOption) {
    if (pressedOption.hasOwnProperty('isChosen'))
      // Jeśli klucz 'chosen' istnieje w obiekcie data, zmień jego wartość na przeciwną
      pressedOption.isChosen = !pressedOption.isChosen
    // Jeśli klucz 'chosen' nie istnieje, dodaj go z wartością true
    else pressedOption.isChosen = true

    // console.log('🚀 ~ handlePress ~ answerValue:', answerValue)
    // console.log('🚀 ~ handlePress ~ id', item)

    // Wywołaj funkcję przekazaną jako fn z argumentem data
    fn(pressedOption, item.id)
  }

  switch (componentType) {
    case 'Text':
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          {...props}
          style={styles.touchableOpacity}
          onPressOut={() => handlePress(option)}
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
          onPressOut={() => handlePress(option)}
        >
          <Text style={styles.buttonText}>{answerValue}</Text>
        </TouchableOpacity>
      )
  }
}

export default function Options({ item, fn }) {
  return (
    <View>
      {item.options.map(option => (
        <View key={option.id} style={styles.answerContainer}>
          {optionComponent(option, fn, item)}
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
