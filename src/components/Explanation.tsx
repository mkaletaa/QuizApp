import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import ContentRenderer from './ContentRenderer'
import { LinearGradient } from 'expo-linear-gradient'
import { explanation as explText } from '../../data/texts'
import { AntDesign } from '@expo/vector-icons'
export default function Explanation({ explanation }) {
  const [viewHeight, setViewHeight] = useState(0)
  const [max, setMax] = useState(150)

  const handleLayout = event => {
    const { height } = event.nativeEvent.layout
    setViewHeight(height)
    console.log(height)
  }

  return (
    <React.Fragment>
      <Text style={styles.heading}>{explText}:</Text>
      <View
        style={{ maxHeight: max, overflow: 'hidden', alignItems: 'center' }}
        onLayout={handleLayout}
      >
        <ContentRenderer content={explanation} />

        {max !== null && viewHeight > 50 && (
          <LinearGradient
            // Button Linear Gradient
            colors={['transparent', 'white']}
            style={{
              width: '110%',
              height: 100,
              position: 'absolute',
              bottom: 0,
            }}
          ></LinearGradient>
        )}
        {max !== null && viewHeight > 50 && (
          <AntDesign
            onPress={() => setMax(null)}
            name="down"
            size={34}
            color="black"
            style={{
              // backgroundColor: 'red',
              position: 'absolute',
              bottom: -5,
              textAlign: 'center',
              // height: 20,
              // width: 30,
            }}
          />
        )}
      </View>
    </React.Fragment>
  )
}

//todo: util styles
const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})
