import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef } from 'react'
import { BackHandler, Dimensions, StyleSheet, Text, View } from 'react-native'
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
  ScrollView, FlatList
} from 'react-native-gesture-handler'
import { Portal } from 'react-native-paper'

import { Colors } from '../../utils/constants'
import useStore from '../../utils/store'
import ContentRenderer from './_ContentRenderer'

export default function Spoiler() {
  const bottomSheetRef = useRef(null)
  const snapPoints = ['31%', '50%', '75%']

  const showBottomSheet = useStore(state => state.showBottomSheet)
  const snapIndex = useStore.getState().bottomSheetSnapIndex
  const bottomSheetContent = useStore.getState().bottomSheetContent
  const setShowBottomSheet = useStore(state => state.setShowBottomSheet)

  useEffect(() => {
    if (showBottomSheet) {
      openBottomSheet()
    } else {
      closeBottomSheet()
    }
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
      backAction,
    )

    return () => backHandler.remove()
  }, [showBottomSheet])

  const setBottomSheetSnapIndex = useStore(
    state => state.setBottomSheetSnapIndex,
  )

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      setShowBottomSheet(true)
      bottomSheetRef.current.snapToIndex(snapIndex || 0)
    }
  }

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      setShowBottomSheet(false)
      setBottomSheetSnapIndex(0)
      bottomSheetRef.current.close()
    }
  }

  const handleGestureEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      closeBottomSheet()
    }
  }

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
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
              backgroundStyle={{ backgroundColor: Colors.surfaceBg }}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  box: {
    width: Dimensions.get('window').width * 0.7, // 80% szerokości ekranu
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
})
