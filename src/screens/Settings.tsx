import React, { useRef, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'

const StickyHeaderScrollView = () => {
  const scrollViewRef = useRef()
  const [stickyHeader, setStickyHeader] = useState(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const percent =
      (contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100
    setScrollPercentage(percent)
  }

  return (
    <View style={styles.container}>
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
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        {/* {stickyHeader} */}
        {/* Reszta zawartości ScrollView */}
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
        <View style={styles.content}>
          <Text>deded</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 50, // Ustaw to, aby uniknąć zakrywania treści przez nagłówek
    // Inna zawartość ScrollView
  },
})

export default StickyHeaderScrollView
