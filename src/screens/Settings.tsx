import React, { useRef } from 'react'
import { View, SectionList, Text, StyleSheet, Button } from 'react-native'

const MySectionList = () => {
  const sectionListRef = useRef()

  const data = [
    {
      title: 'Section 1',
      data: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
    },
    {
      title: 'Section 2',
      data: ['Item 2.1', 'Item 2.2', 'Item 2.3'],
    },
    {
      title: 'Section 3',
      data: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
    },
    {
      title: 'Section 4',
      data: ['Item 2.1', 'Item 2.2', 'Item 2.3'],
    },
    {
      title: 'Section 5',
      data: ['Item 1.1', 'Item 1.2', 'Item 1.3'],
    },
    {
      title: 'Section 6',
      data: ['Item 2.1', 'Item 2.2', 'Item 2.3'],
    },
    // Dodaj więcej sekcji i danych według potrzeb
  ]

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  )

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  )

  const scrollToSection = sectionIndex => {
    if (sectionListRef.current) {
      //@ts-ignore
      sectionListRef.current.scrollToLocation({
        animated: true,
        itemIndex: 1, //for some reason I have to set 1 instead of 0 if using stickySectionHeadersEnabled
        sectionIndex,
      })
    }
  }
  const renderHeader = () => (
    <View style={styles.listHeader}>
      <Button title="Przewiń do Section 2" onPress={() => scrollToSection(2)} />
      <Text style={styles.listHeaderText}>List Header</Text>
    </View>
  )
  return (
    <View>
      <SectionList
        ref={sectionListRef}
        sections={data}
        ListHeaderComponent={renderHeader}
        stickySectionHeadersEnabled
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  sectionHeader: {
    padding: 10,
    backgroundColor: 'lightgray',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  listHeader: {
    padding: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 20,
    color: 'white',
  },
})

export default MySectionList
