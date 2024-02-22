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

import React from 'react'
import IconPrompt from './ui/IconPrompt'

export default function Explanation({
  item,
  chosenOptions,
  nextItem,
  btnTitle,
  showQuestion = false,
}: {
  item: Item
  chosenOptions: Option[]
  nextItem: () => void
  btnTitle: string
  showQuestion: boolean
}) {
  useEffect(() => {
    // console.log('poprawne odpowiedzi: ', question)
  }, [])

  return (
    
    <ScrollView contentContainerStyle={[styles.scrollContainer]}>


      <IconPrompt item={item}></IconPrompt>
      {showQuestion && 



      <Question question={item.question}></Question>

      
      
      }
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Correct answer(s):</Text>
        {item?.options
          .filter(option => option.correct === true)
          .map((option, index) => (
            <ContentRenderer content={option.answer} key={index} />
          ))}

        <Text style={styles.heading}>Your answer(s):</Text>
        {chosenOptions.map((option, index) => (
          <ContentRenderer content={option.answer} key={index} />
        ))}

        <Text style={styles.heading}>Explanation:</Text>
        <ContentRenderer content={item?.explanation} />

        <View style={styles.nextItem}>
          <Button title={btnTitle} onPress={() => nextItem()} />
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
