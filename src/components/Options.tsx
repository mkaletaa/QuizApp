import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TouchableRipple } from 'react-native-paper'
import { multiChoice as multiChoiceText, showOptions } from '../../data/texts'
import { buttonDark, gradient } from '../utils/constants'
import { Option } from '../utils/types'
import { getValue } from '../utils/utilStorage'

const OptionComponent = ({ option }: { option: Option }) => {
  const { val: answerValue } = option
  return <Text style={styles.buttonText}>{answerValue}</Text>
}

const Options = ({ item, multiChoice, chosenOptions, handleOptionPress }) => {
  const [hideAnswers, setHideAnswers] = useState(false)
  
  useEffect(() => {
    async function checkIfShouldHide() {
      const shouldHide = await getValue('hide')
      if (shouldHide === null) setHideAnswers(false)
      else setHideAnswers(shouldHide)
    }
    checkIfShouldHide()
  }, [item])

  // useEffect(() => {
  //   setHideAnswers()
  // }, [item]);
  
  function setButtonBackground(pressedOption: Option) {
    let isChosen = chosenOptions.some(el => el.id === pressedOption.id)
    if (isChosen) {
      handleOptionPress(pressedOption, 'remove')
      return
    }
    if (multiChoice && !isChosen) {
      handleOptionPress(pressedOption, 'add')
      return
    }
    if (!multiChoice && !isChosen) {
      handleOptionPress(pressedOption, 'add')
      return
    }
  }

  return (
    <View style={styles.wrapper}>
      {multiChoice ? (
        <React.Fragment>
          <View style={styles.alert}>
            <AntDesign
              name="warning"
              size={16}
              color="black"
              style={{ marginRight: 5 }}
            />
            <Text style={{ textAlign: 'center', fontSize: 15 }}>
              {multiChoiceText}
            </Text>
          </View>
        </React.Fragment>
      ) : null}

      {hideAnswers ? (
        <Button
          mode="outlined"
          elevation={5}
          style={{
            borderColor: buttonDark,
            borderWidth: 1.5,
          }}
          onPress={() => {
            setHideAnswers(false)
          }}
        >
          <Text>{showOptions}</Text>
        </Button>
      ) : (
        item.options?.map(option => (
          <View key={option.id} style={styles.answerContainer}>
            <TouchableRipple
              rippleColor={
                chosenOptions.some(el => el.id === option.id)
                  ? 'rgba(50, 200, 255, 1)'
                  : 'rgba(50, 200, 255, 0)'
              }
              style={[
                styles.touchableOpacity,
                {
                  backgroundColor: chosenOptions.some(el => el.id === option.id)
                    ? 'lightblue'
                    : gradient,
                  borderColor: chosenOptions.some(el => el.id === option.id)
                    ? 'rgb(50, 200, 255)'
                    : 'rgb(210, 210, 240)',
                },
              ]}
              onPress={() => {
                setButtonBackground(option)
              }}
            >
              <OptionComponent option={option} />
            </TouchableRipple>
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    alignItems: 'center',
    elevation: 5,
  },
  touchableOpacity: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 2.5,
    width: '50%',
    minWidth: 250,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  wrapper: {
    marginBottom: 50,
    marginTop: 20,
  },
  alert: {
    backgroundColor: 'orange',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: 'rgba(249, 105, 14, .65)',
  },
})

export default Options
