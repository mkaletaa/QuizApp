import React, { useRef, useMemo, useCallback } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

export default function Spoiler({value}) {
  // ref to access the Bottom Sheet
  const bottomSheetRef = useRef(null)

  // variables to define Bottom Sheet snap points
  const snapPoints = useMemo(() => ['10%', '50%', '90%'], [])

  // callback to handle Bottom Sheet state changes
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index)
  }, [])

  // function to open the Bottom Sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0) // opens to the first snap point
  }

  return (
    <View style={styles.container}>
      <Button title="Show Spoiler" onPress={openBottomSheet} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // initially closed
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true} // allows closing by panning down
      >
        <View style={styles.contentContainer}>
          <Text style={styles.spoilerText}>This is a spoiler!</Text>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  spoilerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
})
