import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useOptionPress } from '../hooks/useOptionPress'
import MathJax from 'react-native-mathjax'
import { Option } from '../utils/types'

const OptionComponent = ({ option }: { option: Option }) => {
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

const Options = ({ item, multiChoice, handleOptionPress }) => {
  // const { pressedButtons, setPressedButtons, handleOptionPress } =
  //   useOptionPress(item, createResultsArray)
  const [pressedButtons, setPressedButtons] = useState(
    new Map<string, boolean>()
    )
    
    useEffect(() => {
    console.log("🚀 ~ Options ~ item.options:", item.options)
    if (pressedButtons.size > 0) {
      setPressedButtons(new Map())
    }

    const initialPressedButtons: Map<string, boolean> = new Map(
      item.options.map(option => [option.id, false])
    )

    setPressedButtons(initialPressedButtons)

    // return () => {
    //   // Tutaj możesz umieścić kod, który ma zostać wykonany po odmontowaniu komponentu
    //   console.log('Komponent został odmontowany')
    //   setPressedButtons(initialPressedButtons)
    // }
  }, [])

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ pressedButtons:', pressedButtons)
  }, [pressedButtons])

  useEffect(() => {
    // if (pressedButtons.size > 0) {
    //   setPressedButtons(new Map())
    // }

    const initialPressedButtons: Map<string, boolean> = new Map(
      item.options.map(option => [option.id, false])
    )

    setPressedButtons(initialPressedButtons)
  }, [item])

  function setButtonBackground(pressedOption: Option) {
    // console.log('set btn bckgrnd, ', pressedOption)
    //if this option has already been chosen, unchoose it
    if (pressedOption.isMarked) {
      console.log(
        'opcja już była zaznaczona. stan przed zaznaczeniem: ',
        pressedOption
      )
      pressedOption.isMarked = false
      console.log('...i po zaznaczeniu: ', pressedOption)
      setPressedButtons(prevState => {
        const newMap = new Map(prevState)
        newMap.set(pressedOption.id, false)
        return newMap
      })
      handleOptionPress(pressedOption)
      // createResultsArray(pressedOption, item.id)
      return
    }

    if (multiChoice && !pressedOption.isMarked) {
      console.log(
        'opcja nie była zaznaczona (multichoice), stan przed: ',
        pressedOption
      )
      pressedOption.isMarked = true
      console.log('... i stan po: ', pressedOption)

      setPressedButtons(prevState => {
        const newMap = new Map(prevState)
        newMap.set(pressedOption.id, true)
        return newMap
      })
      // createResultsArray(pressedOption, item.id)
      handleOptionPress(pressedOption)

      return
    }

    if (!multiChoice && !pressedOption.isMarked) {
      console.log(
        'opcja nie była zaznaczona (single choice). Stan przed: ',
        pressedOption
      )
      // for (const option of item.options) {
      //   option.isMarked = false
      // }
      pressedOption.isMarked = true
      console.log('...i po: ', pressedOption)

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
      handleOptionPress(pressedOption)

      // createResultsArray(pressedOption, item.id)
      return
    }
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
          <Text>{JSON.stringify(pressedButtons.get(option.id))}</Text>
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
            onPress={() => {
              setButtonBackground(option)
            }}
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
    minWidth: 250, //
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
