import { Pressable, View, Text, Switch } from 'react-native'
import { Item } from '../utils/types'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Question from './Question'

export default function Tile({ item, handlePress }: { item: Item, handlePress: any }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const navigation = useNavigation()

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
            backgroundColor: 'white',
            width: '68%',
            // maxWidth: 400,
            height: 80, //100
            overflow: 'hidden',
            alignItems: 'center',
            marginTop: 16,

            borderRadius: 10,
            elevation: 3,
          },
        ]}
      >
        
        <Question question={item.question} />

        <LinearGradient
          // Button Linear Gradient
          colors={['transparent', 'white']}
          style={{
            width: '100%',
            height: 50,
            position: 'absolute',
            bottom: 0,
          }}
        ></LinearGradient>
      </View>
    </Pressable>
  )
}
