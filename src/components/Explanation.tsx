import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native'
import ContentRenderer from './ContentRenderer'
import { Item, Option } from '../utils/types'
// import Question from './Question'
import { Foundation } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import ExplanationPrompt from './ui/ExplanationPrompt'
import { returnIsCorrect } from '../utils/functions'
import Math from './ContentRenderer/Math'
import CustomModal from './CustomModal'

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
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer]}>
      <Pressable
        onLongPress={() => {
          !showQuestion && setShowQuestionModal(true)
        }}
      >
        <ExplanationPrompt item={item}></ExplanationPrompt>
        {showQuestion && (
          <View
            style={{
              backgroundColor: 'red',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            {/* <Question question={item.question}></Question> */}
            <ContentRenderer content={item?.question} />
          </View>
        )}
        <CustomModal
          showModal={showQuestionModal}
          onRequestClose={() => setShowQuestionModal(false)}
        >
          <ScrollView>
            <ContentRenderer content={item?.question} />
          </ScrollView>
        </CustomModal>

        <View style={styles.contentContainer}>
          {returnIsCorrect(item, chosenOptions) === 'correct' && (
            <Foundation name="check" size={54} color="green" />
          )}

          {returnIsCorrect(item, chosenOptions) === 'incorrect' && (
            <FontAwesome name="remove" size={54} color="red" />
          )}

          {returnIsCorrect(item, chosenOptions) === 'kindof' && (
            <View style={{ flexDirection: 'row' }}>
              <Foundation name="check" size={54} color="orange" />
              <FontAwesome name="remove" size={54} color="orange" />
            </View>
          )}

          <Text style={styles.heading}>Correct answer(s):</Text>
          {item?.options
            .filter(option => option.correct === true)
            .map((option, index) => (
              <ContentRenderer content={option.answer} key={option.id} />
            ))}

          {chosenOptions && chosenOptions.length > 0 && (
            <React.Fragment>
              <Text style={styles.heading}>Your answer(s):</Text>
              {chosenOptions.map((option, index) => (
                <ContentRenderer
                  content={option.answer}
                  key={'chosen_' + option.id}
                />
              ))}
            </React.Fragment>
          )}

          {item?.explanation && (
            <React.Fragment>
              <Text style={styles.heading}>Explanation:</Text>
              <ContentRenderer content={item?.explanation} />
            </React.Fragment>
          )}

          <View style={styles.nextItem}>
            <Button title={btnTitle} onPress={() => handleBtnPress()} />
          </View>
        </View>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    // paddingHorizontal: 10,
    backgroundColor: 'lightblue',
    gap: 10,
    // marginTop:10
    paddingBottom: 50,
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
