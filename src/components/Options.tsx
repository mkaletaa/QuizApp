import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const optionComponent = (option, fn, item) => {
  const { componentType, props, answer: answerValue } = option

  function handlePress(pressedOption) {
    if (pressedOption.hasOwnProperty('isChosen'))
      // Jeśli klucz 'chosen' istnieje w obiekcie data, zmień jego wartość na przeciwną
      pressedOption.isChosen = !pressedOption.isChosen
    // Jeśli klucz 'chosen' nie istnieje, dodaj go z wartością true
    else pressedOption.isChosen = true

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

export default function Options({ item, fn, multiChoice }) {
  return (
    <View style={styles.wrapper}>
      {multiChoice ? (
        <View
          style={{
            backgroundColor: 'orange',
            borderRadius: 4,
            marginBottom: 15,
            alignItems: 'center',
            flexDirection: 'row',
            padding: 5
          }}
        >
          <AntDesign name="warning" size={16} color="black" style={{marginRight: 5}} />
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
            This is a multi choice question
          </Text>
        </View>
      ) : null}

      {item.options.map(option => (
        <View key={option.id} style={styles.answerContainer}>
          {optionComponent(option, fn, item)}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {},
  touchableOpacity: {
    backgroundColor: 'silver',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'dimgrey',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    width: 200,
    textAlign: 'center',
    // Dodaj style dla komponentu Text
  },
  wrapper: {
    marginBottom: -20,
    marginTop: 20,
    // backgroundColor: 'lightblue',
  },
})
