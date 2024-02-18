import { View, Button, StyleSheet, Text } from 'react-native'
import ContentRenderer from './ContentRenderer'
import { Item } from '../utils/types'

export default function Explanation({
  item,
  nextItem,
}: {
  item: Item
  nextItem: () => void
}) {
  return (
    <View style={styles.modalContainer}>
      <Text>poprawne odpowiedzi:</Text>
      {/* {item?.options.map((option, index) => (
            <ContentRenderer content={option}></ContentRenderer>
          ))} */}

      <Text>twoje odpowiedzi:</Text>
      {/* {chosenOptions.map((option, index) => (
            <ContentRenderer content={option}></ContentRenderer>
          ))} */}

      <ContentRenderer content={item?.explanation}></ContentRenderer>
      <Button title="Next Question" onPress={() => nextItem()} />
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
})
