import React, {useRef, useState} from 'react'
import { View, Text, FlatList, Button } from 'react-native'

const YourComponent = () => {
  const data = [
    { key: 'Header', type: 'header' },
    { key: 'Item 1', type: 'item' },
    { key: 'Item 2', type: 'item' },
    { key: 'Item 3', type: 'item' },
    { key: 'Item 4', type: 'item' },
    { key: 'Item 5', type: 'item' },
    { key: 'Item 6', type: 'item' },
    { key: 'Item 7', type: 'item' },
    { key: 'Item 8', type: 'item' },
    { key: 'Item 9', type: 'item' },
    { key: 'Item 10', type: 'item' },
    { key: 'Item 11', type: 'item' },
    { key: 'Item 12', type: 'item' },
    { key: 'Item 13', type: 'item' },
    { key: 'Item 14', type: 'item' },
    { key: 'Item 15', type: 'item' },
    { key: 'Item 16', type: 'item' },
    { key: 'Item 17', type: 'item' },
    { key: 'Item 18', type: 'item' },
    { key: 'Item 19', type: 'item' },
    { key: 'Header2', type: 'header' },

    { key: 'Item 20', type: 'item' },
    { key: 'Item 21', type: 'item' },
    { key: 'Item 22', type: 'item' },
    { key: 'Item 23', type: 'item' },
    { key: 'Item 24', type: 'item' },
    { key: 'Item 25', type: 'item' },
    { key: 'Item 26', type: 'item' },
    { key: 'Item 27', type: 'item' },
    { key: 'Item 28', type: 'item' },
    { key: 'Item 29', type: 'item' },
    { key: 'Item 30', type: 'item' },
    { key: 'Item 31', type: 'item' },
    { key: 'Item 32', type: 'item' },
    { key: 'Item 33', type: 'item' },
    { key: 'Item 34', type: 'item' },
    { key: 'Item 35', type: 'item' },
    { key: 'Item 36', type: 'item' },
    { key: 'Item 37', type: 'item' },
    { key: 'Item 38', type: 'item' },
    { key: 'Item 39', type: 'item' },
    { key: 'Item 40', type: 'item' },
    { key: 'Item 41', type: 'item' },

    // ... inne elementy
  ]

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={{ backgroundColor: 'lightgray', padding: 10 }}>
          <Text>{item.key}</Text>
        </View>
      )
    } else {
      return (
        <View style={{ padding: 20, borderWidth: 1 }}>
          <Text>{item.key}</Text>
        </View>
      )
    }
  }
  const flatListRef = useRef()
  const scrollToHeader = () => {
    // Znajdź indeks pierwszego nagłówka w danych
    const headerIndex = data.findIndex(item => item.type === 'header')

    // Sprawdź, czy indeks został znaleziony i przewiń do nagłówka
    if (headerIndex !== -1 && flatListRef.current) //@ts-ignore
      flatListRef.current.scrollToIndex({
        index: 2,
        animated: true,
      })
    }
  
  const [scrollPercentage, setScrollPercentage] = useState(0)

    const handleScroll = event => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent
      const percent =
        (contentOffset.y / (contentSize.height - layoutMeasurement.height)) *
        100
      setScrollPercentage(percent)
    }

  return (
    <React.Fragment>
      <Button title="scroll" onPress={() => scrollToHeader()} />
      <View
        style={{
          width: `${scrollPercentage}%`,
          height: 5,
          backgroundColor: 'green',
          position: 'absolute',
          top: 0,
          zIndex: 2,
        }}
      />
      <FlatList
        // scrollEventThrottle={1500}
        ref={flatListRef}
        data={data}
        onScroll={handleScroll}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        stickyHeaderIndices={[0, 20]} // Indeksy elementów, które mają być trzymane na górze
      />
    </React.Fragment>
  )
}

export default YourComponent
