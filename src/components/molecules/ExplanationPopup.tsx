import { Entypo, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Animated, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import useAnimatePopup from '../../hooks/useAnimatePopup'
import useStore from '../../utils/store'
import utilStyles from '../../utils/styles'
import MistakeButton from './atoms/MistakeButton'

export default function ExplanationPopup({ item }) {
  const [saved, setSaved] = useState(false)
  const showPopup = useStore(state => state.showPopup)
  const setShowPopup = useStore(state => state.setShowPopup)
  const { popupOpacity, transform } = useAnimatePopup(showPopup)
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    checkIfSaved()
  }, [])

  useEffect(() => {
    setShowPopup(showPopup)
  }, [showPopup])

  const checkIfSaved = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('savedItems')
      const parsedSavedItems = savedItems ? JSON.parse(savedItems) : []
      setSaved(parsedSavedItems.includes(item.id))
    } catch (error) {
      console.error('Cannot check if the question is saved:', error)
    }
  }

  const removeItem = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('savedItems')
      let parsedSavedItems = savedItems ? JSON.parse(savedItems) : []

      parsedSavedItems = parsedSavedItems.filter(
        savedItem => savedItem !== item.id
      )

      await AsyncStorage.setItem('savedItems', JSON.stringify(parsedSavedItems))
      setSaved(false)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  async function saveItem() {
    const value = item.id

    try {
      const existingItems = await AsyncStorage.getItem('savedItems')
      let savedItems = []

      if (existingItems) {
        savedItems = JSON.parse(existingItems)
      }

      savedItems.push(value)

      await AsyncStorage.setItem('savedItems', JSON.stringify(savedItems))
      setSaved(true)
      animateIcon()
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const animateIcon = () => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  })

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  })

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginBottom: 30,
        paddingRight: 10,
        width: '100%',
        backgroundColor: 'transparent',
        height: 1,
        zIndex: 1,
      }}
    >
      <TouchableRipple
        onPress={() => setShowPopup(!showPopup)}
        style={{
          position: 'absolute',
          top: 30,
          right: 20,
          padding: 5,
        }}
        borderless
      >
        <Entypo name="dots-three-vertical" size={28} color="black" />
      </TouchableRipple>

      <Animated.View
        style={[
          utilStyles.popup,
          {
            opacity: popupOpacity,
            transform,
            flexDirection: 'row',
            top: 75,
          },
        ]}
      >
        <MistakeButton prop={`id: ${item.id}`} />

        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: '#ccc',
            marginHorizontal: 10,
          }}
        />

        <Animated.View style={{ transform: [{ scale }], opacity }}>
          {saved ? (
            <Ionicons
              name="bookmark"
              size={35}
              color="orange"
              onPress={() => removeItem()}
            />
          ) : (
            <Ionicons
              name="bookmark-outline"
              size={35}
              color="black"
              onPress={() => saveItem()}
            />
          )}
        </Animated.View>
      </Animated.View>
    </View>
  )
}
