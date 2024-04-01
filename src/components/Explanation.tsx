import {
  View,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Pressable,
  Modal,
  Dimensions,
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
import {
  correctAnswers,
  explanation,
  longPress,
  yourAnswers,
  close,
} from '../../data/texts'

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
    <Pressable
      onLongPress={() => {
        !showQuestion && setShowQuestionModal(true)
      }}
      style={{
        // width: '100%',
        // height: '100%',
        backgroundColor: 'red',
      }}
    >
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <Modal
          visible={showQuestionModal}
          onRequestClose={() => setShowQuestionModal(false)}
          statusBarTranslucent={true}
          transparent={true}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, .9)',
              paddingVertical: 40,
              minHeight: '100%',
              gap: 30,
              // marginHorizontal: 10
            }}
          >
            <View>
              <ContentRenderer content={item?.question} />
            </View>

            <View style={{}}>
              <Button
                title={close}
                onPress={() => setShowQuestionModal(false)}
              ></Button>
            </View>
          </ScrollView>
        </Modal>

        <View style={styles.contentContainer}>
          <ExplanationPrompt item={item}></ExplanationPrompt>

          {showQuestion && (
            <View
              style={{
                // backgroundColor: 'red',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              {/* <Question question={item.question}></Question> */}
              <ContentRenderer content={item?.question} />
            </View>
          )}

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

          <Text style={styles.heading}>{correctAnswers}:</Text>
          {item?.options
            .filter(option => option.correct === true)
            .map((option, index) => (
              <ContentRenderer content={option.val} key={option.id} />
            ))}

          {chosenOptions && chosenOptions.length > 0 && (
            <React.Fragment>
              <Text style={styles.heading}>{yourAnswers}:</Text>
              {chosenOptions.map((option, index) => (
                <ContentRenderer
                  content={option.val}
                  key={'chosen_' + option.id}
                />
              ))}
            </React.Fragment>
          )}

          {item?.explanation && (
            <React.Fragment>
              <Text style={styles.heading}>{explanation}:</Text>
              <ContentRenderer content={item?.explanation} />
            </React.Fragment>
          )}

          <View style={styles.nextItem}>
            <Button title={btnTitle} onPress={() => handleBtnPress()} />
          </View>
        </View>

        {!showQuestion && (
          <Text
            style={{
              color: 'grey',
              fontSize: 11,
              textAlign: 'center',
              position: 'absolute',
              bottom: 10,
              width: Dimensions.get('window').width,
              // backgroundColor: 'rgba(0, 0, 0, 1)',
            }}
          >
            {longPress}
          </Text>
        )}
      </ScrollView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 20,
    minHeight: Dimensions.get('window').height,
  },
  contentContainer: {
    alignItems: 'center',
    // paddingHorizontal: 10,
    // backgroundColor: 'lightblue',
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
