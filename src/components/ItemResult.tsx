import {
  Button,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { Item, Option } from '../utils/types'
import ContentRenderer from './ContentRenderer'
// import Question from './Question'
import { FontAwesome, Foundation } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
// import {  } from 'react-native-gesture-handler'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { correctAnswers, yourAnswers } from '../../data/texts'
import { returnIsCorrect } from '../utils/functions'
import ExpandableView from './ExpandableView'
import ExplanationPrompt from './ui/ExplanationPrompt'
import useStore from '../utils/store'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ItemResult({
  item,
  chosenOptions,
  handleBtnPress,
  btnTitle,
}: {
  item: Item
  chosenOptions: Option[]
  handleBtnPress: () => void
  btnTitle: string
}) {
  // const [showPrompt, setShowPrompt] = useState(false)
  // const [rerender, setRerender] = useState(true)
  // Pobranie wartości showPrompt
  // const showPrompt = useStore(state => state.showPrompt)

  // Ustawienie wartości showPrompt
  const setShowPrompt = useStore(state => state.setShowPrompt)

  return (
    // <SafeAreaView>
    <ScrollView
      contentContainerStyle={[styles.scrollContainer]}
      // onStartShouldSetResponder={() => true}
    >
      <TouchableWithoutFeedback
        style={{
          // backgroundColor: 'red',
          // width: '100%',
          // height: '100%',
        }}
        onPress={() => {
          setShowPrompt(false)
        }}
      >
        <View
          style={styles.contentContainer}
          // onStartShouldSetResponder={() => true}
        >
          {/* <Pressable onPress={()=>setShowPrompt(true)}> */}

          <ExplanationPrompt item={item}></ExplanationPrompt>

          {/* </Pressable> */}
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

          <View
            style={{
              // backgroundColor: 'red',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <ExpandableView data={item.question} />
          </View>

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
            <ExpandableView data={item.explanation} showHeader={true} />
          )}

          <View style={styles.nextItem}>
            <Button title={btnTitle} onPress={() => handleBtnPress()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    // backgroundColor: 'red',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    minHeight: Dimensions.get('window').height,
    flexGrow: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    // paddingHorizontal: 10,
    paddingHorizontal: 20,
    // backgroundColor: 'lightblue',
    gap: 10,
    // marginTop:10
    height: '100%',
    width: '100%',
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
