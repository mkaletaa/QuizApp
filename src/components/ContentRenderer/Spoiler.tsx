import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, BackHandler } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler'
import { Button, Portal } from 'react-native-paper'
import { gradient, surfaceBg } from '../../utils/constants'
import ContentRenderer from './_ContentRenderer'
import useStore from '../../utils/store'

export default function Spoiler({ value, props }) {
  const bottomSheetRef = useRef(null)
  const snapPoints = ['25%', '50%', '75%']
  const showBottomSheet = useStore(state => state.showBottomSheet)
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)
  const bottomSheetContent = useStore.getState().bottomSheetContent

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      setShowBottomSheet(true)
      bottomSheetRef.current.snapToIndex(0)
    }
  }

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      setShowBottomSheet(false)
      bottomSheetRef.current.close()
    }
  }

  const handleGestureEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      closeBottomSheet()
    }
  }

  useEffect(() => {
    if (showBottomSheet) {
      openBottomSheet()
    } else {
      closeBottomSheet()
    }
    // console.log(value)
  }, [showBottomSheet])

  useEffect(() => {
    const backAction = () => {
      if (showBottomSheet) {
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
  }, [showBottomSheet])

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <View style={{ flex: 1 }}>


          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              onChange={index => {
                if (index === -1) {
                  setShowBottomSheet(false)
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
              style={{ flex: 1 }}
            >
              <BottomSheetScrollView
                contentContainerStyle={styles.contentContainer}
              >
                {bottomSheetContent?.map((item, index) => (
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
    alignItems: 'center',
    gap: 10,
    padding: 20,
  },
})
