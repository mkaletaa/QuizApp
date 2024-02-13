import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const option = (data, fn) => {
  const { componentType, props, answer } = data
  const [n, setN]= useState(0)

  function handlePress(data){
    console.log("🚀 ~ handlePress ~ data", data)
    data.neww="ddd"
    setN(prev=>prev+1)
    console.log(n)
  }



  switch (componentType) {
    case 'Text':
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          {...props}
          style={styles.touchableOpacity}
          onPressOut={()=> fn(data)}
        >
          <Text style={styles.buttonText}>{answer} dddg</Text>
        </TouchableOpacity>
      )

    default:
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          {...props}
          style={styles.touchableOpacity}
          onPressOut={() => fn(data)}
        >
          <Text style={styles.buttonText}>{answer}</Text>
        </TouchableOpacity>
      )
  }
}

export default function Answers({ answers, fn }) {
  return (
    <View>
      {answers.map(answer => (
        <View key={answer.id} style={styles.answerContainer}>
          {option(answer, fn)}
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
