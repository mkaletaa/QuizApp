import { LinearGradient } from 'expo-linear-gradient'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import React from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

// import Question from './Question'
import { COLOR, Colors } from '../utils/constants'
import { Item } from '../utils/types'
import ContentRenderer from './ContentRenderer/_ContentRenderer'

export default function Tile({
  item,
  handlePress,
  color = Colors.surfaceBg,
}: {
  item: Item
  handlePress: any
  color?: (typeof COLOR)[keyof typeof COLOR] | typeof Colors.surfaceBg
}) {
  const screenWidth = Dimensions.get('window').width
  const tileWidth = screenWidth * 0.6
  // const viewRef = useRef(null)
  // const [viewWidth, setViewWidth] = useState(0)

  // useLayoutEffect(() => {
  //   if (viewRef.current) {
  //     viewRef.current.measure((x, y, width, height, pageX, pageY) => {
  //       setViewWidth(width)
  //       //  console.log('wysokość: ', width) //nadal 0 po onmount
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('szerokość: ', viewWidth) //nadal 0 po onmount
  // }, [viewWidth])

  function setGradientColor(color: string): string {
    // return Colors.gradientLight
    return Colors.gradientLight
    switch (color) {
      case COLOR.RED: //incorrect
        return 'rgba(255, 147, 147, .35)'
      case COLOR.ORANGE: //correct
        return 'rgba(215, 132,0, 0.2)'
      case COLOR.GREEN: //correct
        return 'rgba(158, 224, 162, .5)'
      default:
        return Colors.gradientLight
    }
  }

  return (
    <View
      // ref={viewRef}
      style={[
        {
          backgroundColor: Colors.surfaceBg,
          width: tileWidth,
          minWidth: 260,
          height: 80, //100
          overflow: 'hidden',
          alignItems: 'center',
          marginTop: 16,
          // justifyContent: 'center',

          borderRadius: 10,
          elevation: 2,

          // borderTopColor: 'rgba(0,205, 0, .1)',
          borderBottomWidth: color === Colors.surfaceBg ? 0 : 3.5,
          borderBottomColor: color,
          // borderRightColor: 'rgba(0,205, 0, .1)',
          // borderLeftColor: 'rgba(0,205, 0, .1)',
        },
      ]}
    >
      <TouchableRipple
        rippleColor="rgb(225, 225, 255)"
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
        <React.Fragment>
          <View style={{ width: '90%' }}>
            {/* <Question question={item.question} /> */}
            <ContentRenderer content={item.question} width={tileWidth * 1.2} />

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
        </React.Fragment>
      </TouchableRipple>
    </View>
  )
}
