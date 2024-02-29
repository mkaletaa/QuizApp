import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
} from 'react-native'
import ContentRenderer from './ContentRenderer'
import { Item, Option } from '../utils/types'
import { useEffect } from 'react'
import Question from './Question'
import { Foundation } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import IconPrompt from './ui/IconPrompt'

export default function Explanation({
  item,
  chosenOptions,
  handleBtnPress,
  btnTitle,
  showQuestion = false,
}: {
  item: Item
  chosenOptions: Option[]
  handleBtnPress: () => void
  btnTitle: string
  showQuestion: boolean
}) {
  useEffect(() => {
    // console.log('poprawne odpowiedzi: ', question)
  }, [])

  function showIcon() {
    if(!chosenOptions) return null
    //zwróć incorrect jeśli żaden element tablicy itemUserChoices nie ma właściwości correct: true
    //zwróć correct jeśli wszystkie elementy tablicy itemUserChoices mają właściwość correct: true i jest ich dokładnie tyle ile elementów tablicy itemUserChoices ma właściwość correct: true
    //zwróć w każdym innym przypadku
    // return
    let nrOfCorrectUserOptions = 0
    let nrOfCorrectOptions = 0

    for (const chosenOption of chosenOptions) {
      if (chosenOption?.correct) nrOfCorrectUserOptions++
    }

    if (nrOfCorrectUserOptions === 0) return 'incorrect'

    for (const option of item?.options) {
      if (option.correct) nrOfCorrectOptions++
    }

    if (
      nrOfCorrectUserOptions === nrOfCorrectOptions &&
      nrOfCorrectOptions === chosenOptions.length
    )
      return 'correct'

    return 'kindof'
  }

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer]}>
      <IconPrompt item={item}></IconPrompt>
      {showQuestion && <Question question={item.question}></Question>}
      <View style={styles.contentContainer}>
        {showIcon() === 'correct' && (
          <Foundation name="check" size={54} color="green" />
        )}

        {showIcon() === 'incorrect' && (
          <FontAwesome name="remove" size={54} color="red" />
        )}

        {showIcon() === 'kindof' && (
          <View style={{flexDirection: 'row'}}>
            <Foundation name="check" size={54} color="orange" />
            <FontAwesome name="remove" size={54} color="orange" />
          </View>
        )}

        <Text style={styles.heading}>Correct answer(s):</Text>
        {item?.options
          .filter(option => option.correct === true)
          .map((option, index) => (
            <ContentRenderer content={option.answer} key={index} />
          ))}

        {chosenOptions && chosenOptions.length > 0 && (
          <React.Fragment>
            <Text style={styles.heading}>Your answer(s):</Text>
            {chosenOptions.map((option, index) => (
              <ContentRenderer content={option.answer} key={index} />
            ))}
          </React.Fragment>
        )}

        <Text style={styles.heading}>Explanation:</Text>
        <ContentRenderer content={item?.explanation} />

        <View style={styles.nextItem}>
          <Button title={btnTitle} onPress={() => handleBtnPress()} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 50,
    // backgroundColor: 'red',
    gap: 10,
    // marginTop:10
    // paddingBottom: 50
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nextItem: {
    marginTop: 20,
  },
})
