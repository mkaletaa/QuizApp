import { View, Button, StyleSheet, Text, ScrollView, StatusBar } from 'react-native'
import ContentRenderer from './ContentRenderer'
import { Item, Option } from '../utils/types'
import { useEffect } from 'react'

export default function Explanation({
  item,
  chosenOptions,
  nextItem,
  btnTitle
}: {
  item: Item
  chosenOptions: Option[]
  nextItem: () => void
  btnTitle: string
}) {
  useEffect(() => {
    // console.log('poprawne odpowiedzi: ', item.options)
  }, [])

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer]}>
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
    gap: 10
    // paddingBottom: 50
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nextItem:{
    marginTop: 20
  }
})
