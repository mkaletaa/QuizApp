import { Entypo, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Animated, Modal, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

import useAnimatePopup from '../../hooks/useAnimatePopup'
import { Colors } from '../../utils/constants'
import utilStyles from '../../utils/styles'
import { getValue, setValue } from '../../utils/utilStorage'
import MistakeButton from './atoms/MistakeButton'

export default function ResultPopup({ item }) {
  const [saved, setSaved] = useState(false)
  // const showPopup = useStore(state => state.showPopup)
  // const setShowPopup = useStore(state => state.setShowPopup)
  const [showPopup, setShowPopup] = useState(false)
  const { popupOpacity, transform } = useAnimatePopup(showPopup)
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    checkIfSaved()
  }, [])

  useEffect(() => {
    // setShowPopup(showPopup)
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
        savedItem => savedItem !== item.id,
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
      let savedItems = await getValue('savedItems')
      savedItems.push(value)
      await setValue('savedItems', savedItems)
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
    outputRange: [1, 1.3],
  })

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  })

  return (
    <React.Fragment>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginTop: 30,
          paddingRight: 10,
          width: '100%',
          backgroundColor: 'transparent',
          height: 1,
          zIndex: 1,
          position: 'absolute',
        }}
      >
        <TouchableRipple
          onPress={() => setShowPopup(true)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: 5,
          }}
          borderless
        >
          <Entypo name="dots-three-vertical" size={28} color="black" />
        </TouchableRipple>
      </View>

      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        {/* <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} /> */}
        <TouchableWithoutFeedback onPress={() => setShowPopup(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the opacity as needed
              justifyContent: 'center',
              alignItems: 'center',
              // gap: 20,
            }}
          >
            <TouchableWithoutFeedback>
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
                    backgroundColor: Colors.border,
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
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* <Animated.View
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
      </Animated.View> */}
    </React.Fragment>
  )
}
