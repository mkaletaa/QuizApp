import { Pressable, View, Text, Switch, ScrollView } from 'react-native'
import { Item } from '../utils/types'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Question from './Question'

export default function Tile({
  item,
  handlePress,
  color = 'white',
}: {
  item: Item
  handlePress: any
  color?: any
}) {
  // const [isEnabled, setIsEnabled] = useState(false)
  // const navigation = useNavigation()

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
            width: '78%',
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
        <Question question={item.question} />

        <LinearGradient
          // Button Linear Gradient
          colors={['transparent', "lightgray"]}
          style={{
            width: '100%',
            height: 30,//used to be 50
            position: 'absolute',
            bottom: 0,
          }}
        ></LinearGradient>
      </View>
    </Pressable>
  )
}
