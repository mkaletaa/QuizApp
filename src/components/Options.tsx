import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'
import { multiChoice as multiChoiceText } from '../../data/texts'
import { gradient } from '../utils/constants'
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
        <React.Fragment>
          {/* <Chip mode="outlined">{multiChoiceText}</Chip> */}

          <View style={styles.alert}>
            <AntDesign
              name="warning"
              size={16}
              color="black"
              style={{ marginRight: 5 }}
            />
            <Text
              // variant="labelSmall"
              style={{ textAlign: 'center', fontSize: 15 }}
            >
              {multiChoiceText}
            </Text>
          </View>
        </React.Fragment>
      ) : null}

      {item.options?.map(option => (
        <View key={option.id} style={styles.answerContainer}>
          {/* <Button
            mode="outlined"
            rippleColor="lightblue"
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
          </Button> */}

          <TouchableRipple
            // activeOpacity={0.7}
            // {...props}
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
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  answerContainer: {
    // width: 300,
    alignItems: 'center',
    elevation: 5
    // backgroundColor: 'red',
    // marginBottom: 50
  },
  touchableOpacity: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 2.5,
    
    // borderColor: 'grey',
    width: '50%',
    minWidth: 250, //
    overflow: 'hidden',
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
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 7,
    borderWidth:2,
    borderColor: 'rgba(249, 105, 14, .65)',
  },
})

export default Options
