import React from 'react'
import { View, StatusBar, Text, StyleSheet, Pressable } from 'react-native'
import MathJax from 'react-native-mathjax'

export default function Options() {
  const handleLongPress = e => {
    console.log('first')
    //e.preventDefault() // Prevent the default context menu
    // Additional logic or actions you want to perform on long press
  }

  return (
    <View>
      <Text>Options</Text>
      <StatusBar />

      <Pressable onPress={handleLongPress} onLongPress={handleLongPress}>
        <MathJax
          style={styles.math}
          html={'$sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$'}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  math: {
    backgroundColor: 'transparent',
    height: 400,
    // width:50
  },
})
