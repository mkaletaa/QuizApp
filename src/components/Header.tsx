import React, { useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import useStore from '../utils/store'
import { Button } from 'react-native-paper'
// import { useRoute } from '@react-navigation/native'
export default function Header({ title }) {
  const navigation = useNavigation()
  const setShowPopup = useStore(state => state.setShowPopup)
  const headerTitle = useStore(state => state.headerTitle)
  const [headerTitleState, setHeaderTitleState] = useState('')
  // Pobieranie wartości 'name' z obiektu 'route.params'
  useEffect(() => {
    setTimeout(() => {
      setHeaderTitleState(headerTitle)
    }, 10)
  }, [])

  return (
    //todo: popraw Header
    <Pressable
      style={{
        // backgroundColor: 'red',
        width: 320,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onPress={() => {
        setShowPopup(false)
        console.log('first')
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: 'blue',
          // gap: 20,
          paddingRight: 20,
          alignItems: 'center',
          height: '100%',
          // justifyContent: 'center',
        }}
      >
        <React.Fragment>
          <Text
            style={{
              // backgroundColor: 'red',
              flex: 1,
              fontSize: 20,
              // paddingLeft: 10,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          {/* <FontAwesome6 name="fire-flame-curved" size={26} color="black" /> */}
          {/* <View style={{ flexDirection: 'row', gap: 1 }}>
          <Text style={{ fontSize: 18, marginTop: -2 }}>10</Text>
          <Octicons name="flame" size={26} color="orange" />
        </View> */}

          {/* <FontAwesome6 name="circle-dollar-to-slot" size={24} color="black" /> */}
          <View style={{
            flexDirection: "row",
            // paddingHorizontal: 10,
            gap: 15
          }}>
            <Ionicons
              style={{
                // backgroundColor: 'yellow',
              }}
              name="bookmark-outline"
              size={30}
              color="black"
              onPress={() => {
                //@ts-ignore
                navigation.navigate('Saved')
                setShowPopup(false)
              }}
            />

            <Feather
              name="sliders"
              size={28}
              color="black"
              onPress={() => {
                //@ts-ignore
                navigation.navigate('Settings')
                setShowPopup(false)
              }}
            />
          </View>
          {/*
        <Feather
          name="sliders"
          size={28}
          color="black"
          //@ts-ignore
          onPress={() => navigation.navigate('Settings2')}
        />
        <Feather
          name="sliders"
          size={28}
          color="black"
          //@ts-ignore
          onPress={() => navigation.navigate('Settings3')}
        /> */}
        </React.Fragment>
      </View>
    </Pressable>
  )
}

function useRoute() {
  throw new Error('Function not implemented.')
}
