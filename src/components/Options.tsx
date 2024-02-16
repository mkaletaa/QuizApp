import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const OptionComponent = ({ option, fn, item }) => {
  const { componentType, props, answer: answerValue } = option

  switch (componentType) {
    case 'Text':
      return <Text style={styles.buttonText}>{answerValue} dddg</Text>

    default:
      return (
        <Text style={styles.buttonText}>{answerValue}</Text>
        // </TouchableOpacity>
      )
  }
}

const Options = ({ item, fn, multiChoice }) => {
  const [pressedButtons, setPressedButtons] = useState(
    new Map<string, boolean>()
    )
    
    useEffect(() => {
      const initialPressedButtons = new Map()
      
      // Inicjalizacja mapy
      for (const option of item.options) {
        //sometimes a bug occurs; for some reason isChosen is initialy set to true for correct answers
        option.isChosen=false
        initialPressedButtons.set(option.id, false)
      }
      
      console.log("🚀 ~ Options ~ item:", item.options)
    setPressedButtons(initialPressedButtons)
  }, [])

  // useEffect(() => {
  //   console.log('🚀 ~ Options ~ pressedButtons:', pressedButtons)
  // }, [pressedButtons])

  function handlePress(pressedOption, multiChoice: boolean): void {
    // console.log('pressedOptoin 0: ', pressedOption)
    //if this option has already been chosen, unchoose it
    if (pressedOption.isChosen) {
      // console.log('pressedOptoin 1: ', pressedOption)
      pressedOption.isChosen = false
      setPressedButtons(prevState => {
        const newMap = new Map(prevState)
        newMap.set(pressedOption.id, false)
        return newMap
      })
      fn(pressedOption, item.id)
      return
    }

    if (multiChoice && !pressedOption.isChosen) {
      // console.log('pressedOptoin 2: ', pressedOption)

      pressedOption.isChosen = true
      
      setPressedButtons(prevState => {
        const newMap = new Map(prevState)
        newMap.set(pressedOption.id, true)
        return newMap
      })
      fn(pressedOption, item.id)
      return
    }

    //czy ten kod soę wykona, jeśli isChosen było true?
    if (!multiChoice && !pressedOption.isChosen) {
      // console.log('pressedOptoin 3: ', pressedOption)
      for (const option of item.options) {
        option.isChosen = false
      }
      pressedOption.isChosen = true

      //ustaw wszystkie wartości na false
      setPressedButtons(prevState => {
        const newMap = new Map(prevState)

        // Ustaw wszystkie wartości na false
        newMap.forEach((value, key) => {
          newMap.set(key, false)
        })

        // Ustaw konkretny klucz na true
        newMap.set(pressedOption.id, true)

        return newMap
      })
      fn(pressedOption, item.id)
      return
    }

  }

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
            padding: 5,
          }}
        >
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
            onPress={() => handlePress(option, multiChoice)}
          >
            <Text>{option.isChosen ? 'true' : 'false'}</Text>
            <OptionComponent option={option} fn={fn} item={item} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {},
  touchableOpacity: {
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
  },
  wrapper: {
    marginBottom: -20,
    marginTop: 20,
  },
})

export default Options
// function useEffect(arg0: () => void, arg1: undefined[]) {
//   throw new Error('Function not implemented.')
// }
