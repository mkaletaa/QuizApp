import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useOptionPress } from '../hooks/useOptionPress'
import MathJax from 'react-native-mathjax'
import {Option} from '../utils/types'

const OptionComponent = ({ option }: {option: Option}) => {
  const { componentType, answer: answerValue } = option


  switch (componentType) {
    case 'Text':
      return <Text style={styles.buttonText}>{answerValue} dddg</Text>
    case 'Math':
      return (
        <MathJax
          style={{ backgroundColor: 'transparent' }}
          // mathJaxOptions={mmlOptions}
          html={answerValue}
          // config={{ 'HTML-CSS': {  scale: 20 } }}
        />
      )
    default:
      return <Text style={styles.buttonText}>{answerValue}</Text>
  }
}

const Options = ({ item, createResultsArray, multiChoice }) => {
  const { pressedButtons, setPressedButtons, handleOptionPress } =
    useOptionPress(item, createResultsArray)

  useEffect(() => {
    const initialPressedButtons = new Map(
      item.options.map(option => [option.id, false])
    )

    // console.log('🚀 ~ Options ~ item:', item.options)
    //@ts-ignore
    setPressedButtons(initialPressedButtons)
  }, [])

    const handleLongPress = e => {

      e.preventDefault() // Prevent the default context menu
      // Additional logic or actions you want to perform on long press
    }

  return (
    <View style={styles.wrapper}>
      {multiChoice ? (
        <View style={styles.alert}>
          <AntDesign
            name="warning"
            size={16}
            color="black"
            style={{ marginRight: 5 }}
          />
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
            This is a multi-choice question
          </Text>
        </View>
      ) : null}

      {item.options.map(option => (
        <View key={option.id} style={styles.answerContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            // {...props}
            style={[
              styles.touchableOpacity,
              {
                backgroundColor: pressedButtons.get(option.id)
                  ? 'lightblue'
                  : 'silver',
              },
            ]}
            onPress={() => handleOptionPress(option, multiChoice)}
            onLongPress={handleLongPress}
          >
            <OptionComponent option={option} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    // width: 300,
    alignItems: 'center',
    // backgroundColor: 'red',
    // marginBottom: 50
  },
  touchableOpacity: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'dimgrey',
    width: 250,
    minWidth: 250//
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    // width: 250,
    textAlign: 'center',
    // backgroundColor: 'white',
  },
  wrapper: {
    marginBottom: 50,
    marginTop: 20,
  },
  alert: {
    backgroundColor: 'orange',
    borderRadius: 4,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
})

export default Options
