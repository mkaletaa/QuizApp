// import Question from './Question'
import { FontAwesome, Foundation } from '@expo/vector-icons'
import React from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

import { correctAnswers, yourAnswers } from '../../data/texts'
import { COLOR, Colors } from '../utils/constants'
import { returnIsCorrect } from '../utils/functions'
import { Item, Option } from '../utils/types'
import ContentRenderer from './ContentRenderer/_ContentRenderer'
import ExpandableView from './ExpandableView'
import ExplanationPopup from './molecules/ExplanationPopup'

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
  return (
    // <SafeAreaView>
    <ScrollView contentContainerStyle={[styles.scrollContainer]}>
      <ExplanationPopup item={item}></ExplanationPopup>

      <View style={styles.contentContainer}>
        {returnIsCorrect(item, chosenOptions) === 'correct' && (
          <Foundation name="check" size={54} color={COLOR.GREEN} />
        )}

        {returnIsCorrect(item, chosenOptions) === 'incorrect' && (
          <FontAwesome name="remove" size={54} color={COLOR.RED} />
        )}

        {returnIsCorrect(item, chosenOptions) === 'kindof' && (
          <View style={{ flexDirection: 'row' }}>
            <Foundation name="check" size={54} color={COLOR.ORANGE} />
            <FontAwesome name="remove" size={54} color={COLOR.ORANGE} />
          </View>
        )}

        <View
          style={{
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
          <PaperButton
            mode="outlined"
            onPress={() => {
              handleBtnPress()
            }}
            elevation={5}
            style={{
              borderColor: Colors.primary,
              borderWidth: 1.5,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
              }}
            >
              {btnTitle}
            </Text>
          </PaperButton>
        </View>
      </View>
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
    width: Dimensions.get('window').width,
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
    color: Colors.boldText,
  },
  nextItem: {
    marginTop: 20,
  },
})
