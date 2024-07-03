import BottomSheet from '@gorhom/bottom-sheet'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
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

  const openBottomSheet = () => {
    bottomSheetRef.current.expand()
  }

  const handleGestureEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      bottomSheetRef.current.close()
    }
  }

  useEffect(() => {
    console.log(value)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        // minDeltaX={10} // Minimalny przeskok po osi X, który ma uruchomić zdarzenie
        // minDeltaY={10} // Minimalny przeskok po osi Y, który ma uruchomić zdarzenie
      >
        <View style={{ flex: 1 }}>
          <Button
            mode="contained"
            onPress={() => bottomSheetRef.current.snapToIndex(0)}
          >
            Pokaż spoiler
          </Button>

          <Portal>
            <BottomSheet
              ref={bottomSheetRef}
              index={-1}
              snapPoints={snapPoints}
              onChange={() => {}}
              enablePanDownToClose
              handleStyle={{
                backgroundColor: gradient,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }} // Set handle (indicator) color here
              backgroundStyle={{ backgroundColor: surfaceBg }}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.spoilerText}>This is a spoiler!</Text>
                {value.map(item => (
                  <ContentRenderer content={[item]} />
                ))}
              </View>
            </BottomSheet>
          </Portal>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10
  },
  spoilerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
})
