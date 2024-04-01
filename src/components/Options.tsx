import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { multiChoice as multiChoiceText } from '../../data/texts'
import { Option } from '../utils/types'

const OptionComponent = ({ option }: { option: Option }) => {
  const { val: answerValue } = option

  return <Text style={styles.buttonText}>{answerValue}</Text>
}

const Options = ({ item, multiChoice, chosenOptions, handleOptionPress }) => {
  function setButtonBackground(pressedOption: Option) {
    let isChosen = chosenOptions.some(el => el.id === pressedOption.id)
    // const updatedOption = { ...pressedOption }

    //if this option has already been chosen, unchoose it
    if (isChosen) {
      handleOptionPress(pressedOption, 'remove')
      return
    }
    //if this option han't been chosen yet, add it to chosenOptions
    if (multiChoice && !isChosen) {
      handleOptionPress(pressedOption, 'add')
      return
    }

    //if this option han't been chosen yet, add it to chosenOptions
    if (!multiChoice && !isChosen) {
      handleOptionPress(pressedOption, 'add')
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
            {multiChoiceText}
          </Text>
        </View>
      ) : null}

      {item.options?.map(option => (
        <View key={option.id} style={styles.answerContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            // {...props}
            style={[
              styles.touchableOpacity,
              {
                backgroundColor: chosenOptions.some(el => el.id === option.id)
                  ? 'lightblue'
                  : 'silver',
                borderColor: chosenOptions.some(el => el.id === option.id)
                  ? 'rgb(50, 200, 255)'
                  : 'rgb(160, 160, 160)',
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
    borderWidth: 3,
    // borderColor: 'grey',
    width: '50%',
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
