import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler'
import { Button, Portal } from 'react-native-paper'
import { gradient, surfaceBg } from '../../utils/constants'
import ContentRenderer from './_ContentRenderer'

export default function Spoiler({ value, props }) {
  const bottomSheetRef = useRef(null)
  const snapPoints = ['25%', '50%', '75%']
  const [isOpen, setIsOpen] = useState(false)

  const openBottomSheet = () => {
    setIsOpen(true)
    bottomSheetRef.current.snapToIndex(props ? props.index : 0)
  }

  const closeBottomSheet = () => {
    setIsOpen(false)
    bottomSheetRef.current.close()
  }

  const handleGestureEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      closeBottomSheet()
    }
  }

  useEffect(() => {
    console.log(value)
  }, [])

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  )

  useEffect(() => {
    const backAction = () => {
      if (isOpen) {
        closeBottomSheet()
        return true
      }
      return false
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [isOpen])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <View style={{ flex: 1 }}>
          <Button mode="contained" onPress={openBottomSheet}>
            Pokaż spoiler
          </Button>

          <Portal>
            <BottomSheet
              //* wkrótce będzie można ustawić synamiczne snappointy
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              onChange={index => {
                if (index === -1) {
                  setIsOpen(false)
                }
              }}
              enablePanDownToClose
              handleStyle={{
                backgroundColor: 'rgb(225, 225, 255)',
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
              }}
              handleIndicatorStyle={{
                backgroundColor: 'rgb(200,205,245)',
              }}
              backgroundStyle={{ backgroundColor: surfaceBg }}
              backdropComponent={renderBackdrop}
              style={{flex:1}}
            >
              <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                {/* <Text style={styles.spoilerText}>This is a spoiler!</Text> */}
                {value.map((item, index) => (
                  <ContentRenderer key={index} content={[item]} />
                ))}
              </BottomSheetScrollView>
            </BottomSheet>
          </Portal>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
  // spoilerText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginTop: 20,
  // },
})
