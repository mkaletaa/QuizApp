import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { explanation as explText } from '../../data/texts'
import { boldTextColor } from '../utils/constants'
import useStore from '../utils/store'
import ContentRenderer from './ContentRenderer/_ContentRenderer'
export default function ExpandableView({ data, showHeader = false }) {
  const [viewHeight, setViewHeight] = useState(0)
  const [max, setMax] = useState(150)
  // const setShowPopup = useStore(state => state.setShowPopup)

  const handleLayout = event => {
    const { height } = event.nativeEvent.layout
    setViewHeight(height)
    console.log(height)
  }

  return (
    <React.Fragment>
      {showHeader && <Text style={styles.heading}>{explText}:</Text>}
      <View
        style={{ maxHeight: max, overflow: 'hidden', alignItems: 'center' }}
        onLayout={handleLayout}
      >
        <ContentRenderer content={data} />

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
            onPress={() => {
              setMax(null)
              // setShowPopup(false)
            }}
            name="down"
            size={34}
            color={boldTextColor}
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
