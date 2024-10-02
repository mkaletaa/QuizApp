import React from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import Gradient from '../components/molecules/atoms/Gradient'
import { Colors } from '../utils/constants'

export default function Donate() {
  return (
    <View
      style={{
        // alignItems: 'center',
        backgroundColor: Colors.screenBg,
        flex: 1,

        //   padding: 12,
      }}
    >
      {/* <ScrollView
        contentContainerStyle={{
          backgroundColor: Colors.screenBg,
          flex: 1,
          zIndex: 20,
          // gap: 20
          }}
          > */}
      <View
        style={{
          gap: 20,
          marginTop: '5%',
          width: '90%',
          zIndex: 2,
          alignSelf: 'center',
          padding: 7,
          overflow: 'hidden',
          marginVertical: 20,
          position: 'relative', // Ensure proper positioning of absolute elements
          backgroundColor: Colors.gradientLight,
          borderRadius: 10,
          elevation: 1,
          borderWidth: 1,
          borderColor: Colors.gradient,
        }}
      >
        <Text style={{ fontSize: 17, color: Colors.text, lineHeight: 23 }}>
          Aplikacja jest darmowa i nie posiada reklam. Jeśli okazała się pomocna
          i chcesz wyrazić wdzięczność za trud wzłożony w jej rozwój, możesz
          przelać grosza. Zignoruj jeśli chcesz, żeby kiciuś był smutny.
        </Text>
        <Button
          mode="elevated"
          rippleColor="thistle"
          style={{
            backgroundColor: Colors.primary,
            borderWidth: 1.5,
            // paddingVertical: 0,
            //   marginTop: 20,
            borderRadius: 8,
          }}
          onPress={() => {
            Alert.alert('O cholibka!', 'nie dodałem jeszcze adresu')
          }}
        >
          <Text style={{ color: 'white' }}>Wesprzyj</Text>
        </Button>
      </View>
      {/* </ScrollView> */}
      <View style={{ flex: 1 }}>
        <Image
          source={require('../../assets/kot.png')}
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: -135,
            zIndex: 1,
            // backgroundColor: 'red',
          }}
          resizeMode="contain"
        />
        <Gradient />
      </View>
    </View>
  )
}
