import { Pressable, View, Text, Switch, ScrollView } from 'react-native'
import { Item } from '../utils/types'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
// import Question from './Question'
import ContentRenderer from './ContentRenderer'

export default function Tile({
  item,
  handlePress,
  color = 'white',
}: {
  item: Item
  handlePress: any
  color?: any
}) {
  function setGradientColor(color: string): string {
    switch (color) {
      case 'red':
        return 'rgb(190, 0, 0)'
      case 'orange':
        return 'rgb(215, 132, 0)'
      case 'green':
        return 'rgb(0, 90, 0)'
      default:
        return 'rgb(233, 233, 233)'
    }
  }

  return (
    <Pressable
      style={{
        // backgroundColor: 'red',
        alignItems: 'center',
      }}
      onPress={() => {
        handlePress(item)
      }}
    >
      <View
        style={[
          {
            backgroundColor: color,
            width: '60%',
            height: 80, //100
            overflow: 'hidden',
            alignItems: 'center',
            marginTop: 16,
            paddingTop: 20,
            // justifyContent: 'center',

            borderRadius: 10,
            elevation: 3,
          },
        ]}
      >
        <View style={{ width: '90%' }}>
          {/* <Question question={item.question} /> */}
          <ContentRenderer content={item.question} />

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
      </View>
    </Pressable>
  )
}
