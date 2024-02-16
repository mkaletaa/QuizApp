import React from 'react'
import { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
// import { Button, } from 'react-native-paper' // Załóżmy, że używasz biblioteki react-native-paper
import { Entypo } from '@expo/vector-icons'
export default function Pagination({
  scrollTo,
  elements = null,
  currentVisibleIndex = null,
  results,
}) {
  const [nrOfVisibles, setNrOfVisibles] = useState(0)

  // Tworzenie danych - liczby naturalne od 1 do ilości elementów
  const data = Array.from({ length: elements.length }, (_, index) => ({
    key: String(index),
    index: index + 1, // Dodaj 1, aby zacząć od liczby 1
  }))

  const renderItem = ({ item }) => (
    <View
      key={item.key}
      style={[
        styles.page,
        item.index === currentVisibleIndex + 1 && styles.activePage,
      ]}
    >
      {item.index === elements.length ? ( // Sprawdź, czy to ostatni element
        // <IconButton
        //   icon="check" // Ikona "check" z biblioteki react-native-paper
        //   color={
        //     results[item.index - 1]?.userChoices.length > 0
        //       ? 'green'
        //       : undefined
        //   }
        //   onPress={() => scrollTo(item.index - 1)}
        // />
        <Entypo
          onPress={() => scrollTo(item.index - 1)}
          name="arrow-bold-right"
          size={24}
          color="black"
        />
      ) : (
        <Button
          color={
            results[item.index - 1]?.userChoices.length > 0
              ? undefined
              : '#ffa500'
          }
          title={item.index.toString()}
          onPress={() => scrollTo(item.index - 1)}
        />
      )}
    </View>
  )

  return (
    <View style={styles.paginationContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        horizontal
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    alignItems: 'center',
    backgroundColor: 'lightgray',
    height: 45,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  page: {
    marginHorizontal: 5,
  },
  activePage: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
})
