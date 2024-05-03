import { Pressable, View, Text, Switch, ScrollView } from 'react-native'
import { Item } from '../utils/types'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
// import Question from './Question'
import ContentRenderer from './ContentRenderer/_ContentRenderer'
import { surfaceBg } from '../utils/constants'

export default function Tile({
  item,
  handlePress,
  color = surfaceBg,
}: {
  item: Item
  handlePress: any
  color?: any
}) {
  const viewRef = useRef(null)
  const [viewWidth, setViewWidth] = useState(0)

  useLayoutEffect(() => {
    if (viewRef.current) {
      viewRef.current.measure((x, y, width, height, pageX, pageY) => {
        setViewWidth(width)
        //  console.log('wysokość: ', width) //nadal 0 po onmount
      })
    }
  }, [])

  useEffect(() => {
    console.log('szerokość: ', viewWidth) //nadal 0 po onmount
  }, [viewWidth])

  function setGradientColor(color: string): string {
    switch (color) {
      case 'red':
        return 'rgb(190, 0, 0)'
      case 'orange':
        return 'rgb(215, 132, 0)'
      case 'green':
        return 'rgb(0, 90, 0)'
      default:
        return 'rgb(240, 240, 240)'
    }
  }

  return (
    <View
      ref={viewRef}
      style={[
        {
          backgroundColor: color,
          width: '60%',
          minWidth: 260,
          height: 80, //100
          overflow: 'hidden',
          alignItems: 'center',
          marginTop: 16,
          // justifyContent: 'center',

          borderRadius: 10,
          elevation: 3,
        },
      ]}
    >
      <Pressable
        style={{
          paddingTop: 20,
          // backgroundColor: 'red',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
        onPress={() => {
          handlePress(item)
        }}
      >
        <View style={{ width: '90%' }}>
          {/* <Question question={item.question} /> */}
          <ContentRenderer content={item.question} width={viewWidth} />

          {/* {questionData.map(questionComponent => (
        <ContentRenderer data={questionComponent}></ContentRenderer>
      ))} */}
        </View>
        <LinearGradient
          // Button Linear Gradient
          colors={['transparent', 'transparent', setGradientColor(color)]}
          style={{
            width: '100%',
            height: '100%', //has to be 100% cuz if Math component, Tile cannot be pressed
            position: 'absolute',
            bottom: 0,
          }}
        ></LinearGradient>
      </Pressable>
    </View>
  )
}
