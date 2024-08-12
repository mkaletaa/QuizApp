import React from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import { Colors } from '../utils/constants'
import Gradient from '../components/molecules/atoms/Gradient'

export default function Donate() {
  return (
    <View style={{
        // alignItems: 'center',
        backgroundColor: Colors.screenBg,
          flex: 1,
        //   padding: 12,
      }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: Colors.screenBg,
            padding: 12,
            flex: 1,
            zIndex:2
            // gap: 20
          }}
        >
          <View
            style={{
              backgroundColor: Colors.surfaceBg,
              padding: 10,
              borderRadius: 10,
              gap: 20,
              // elevation: 1,
              borderWidth: 1.5,
              borderColor: Colors.border,
              zIndex: 3,
            }}
          >
            <Text style={{ fontSize: 17, color: Colors.text, lineHeight: 25 }}>
              Aplikacja jest darmowa i nie posiada reklam. Jeśli chcesz podziękować
              za trud wzłożony w jej rozwój, możesz przekazać darowiznę.
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
                Alert.alert('dd')
              }}
            >
              <Text style={{ color: 'white' }}>Wpłać</Text>
            </Button>
          </View>
        </ScrollView>
          <Image
            source={require('../../assets/kot.png')}
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 0,
              right: -30,
              zIndex:2
            //   backgroundColor: 'red',
            }}
            resizeMode="contain"
          />
              <View style={{zIndex: 1, flex:1}}>
                  <Gradient />
              </View>
    </View>
  )
}
